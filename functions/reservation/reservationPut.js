import { dbSagre } from "../../mysql/dbConnection.js";
import { getPriceOfBeverages } from "../beverage/beverageGet.js";
import { getPriceOfFoods } from "../foods/foodsGet.js";

async function addCompleteReservation(resDetail, foods, beverages) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  if (
    !resDetail.table ||
    !resDetail.coverCharge ||
    !resDetail.name ||
    resDetail.isPayed === undefined
  ) {
    return {
      error: true,
      data: "No reservation details!",
      status: 400,
    };
  }

  //calculating total price

  //getting price of beverages
  var beveragePrice = 0;
  if (beverages && beverages.length > 0) {
    var formattedBeveragesIDs = beverages.map((el) => el.idBeverage);
    beveragePrice = await getPriceOfBeverages(formattedBeveragesIDs);
    beveragePrice = parseFloat(beveragePrice[0].totalPrice);
  }
  //getting price of foods
  var foodPrice = 0;
  if (foods && foods.length > 0) {
    var formattedFoodsIDs = foods.map((el) => el.idFood);
    foodPrice = await getPriceOfFoods(formattedFoodsIDs);
    foodPrice = parseFloat(foodPrice[0].totalPrice);
  }
  //at last, the total price
  const totalPrice = beveragePrice + foodPrice;

  //preparing sql statements
  var sqlAddReservation = `INSERT INTO prenotazione (tavolo, coperti, nominativo, isPagato, totale) VALUES (?,?,?,?,?);`;
  var sqlAddBeverages = `INSERT INTO erogazione (idPrenotazione, idBevanda, quantita, noteErogazione) VALUES ?;`;
  var sqlAddFoods = `INSERT INTO preparazione (idPrenotazione, idCibo, quantita, notePreparazione) VALUES ?;`;

  // starting queries
  try {
    await dbSagre.promise().beginTransaction();
  } catch (err) {
    result.error = true;
    result.data = err;
    result.status = 500;
  }

  //creating the reservation
  var resultReservation = null;
  try {
    resultReservation = await dbSagre
      .promise()
      .query(sqlAddReservation, [
        resDetail.table,
        resDetail.coverCharge,
        resDetail.name,
        resDetail.isPayed,
        totalPrice,
      ]);
  } catch (err) {
    result.error = true;
    result.data = `${err.message}\nError while saving reservation details`;
    result.status = 400;
  }

  //check if required beverages
  if (!result.error && beverages && beverages.length > 0) {
    const formattedBeverages = beverages.map((single) => {
      return [
        resultReservation[0].insertId,
        single.idBeverage,
        single.quantity,
        single.notes,
      ];
    });

    //creating requests of beverages
    try {
      const resultBeverages = await dbSagre
        .promise()
        .query(sqlAddBeverages, [formattedBeverages]);
    } catch (err) {
      result.error = true;
      result.data = `${err.message}\nError while saving beverages! Rollback actions!`;
      result.status = 400;
    }
  }

  //check if required food
  if (!result.error && foods && foods.length > 0) {
    const formattedFoods = foods.map((single) => {
      return [
        resultReservation[0].insertId,
        single.idFood,
        single.quantity,
        single.notes,
      ];
    });

    //creating requests of foods
    try {
      const resultFoods = await dbSagre
        .promise()
        .query(sqlAddFoods, [formattedFoods]);
    } catch (err) {
      result.error = true;
      result.data = `${err.message}\nError while saving foods! Rollback actions!`;
      result.status = 400;
    }
  }

  if (result.error === false) {
    await dbSagre.promise().commit();
    result.err = false;
    result.data = "Reservation saved correctly!";
    result.status = 200;
  } else {
    await dbSagre.promise().rollback();
  }

  return result;
}

export { addCompleteReservation };
