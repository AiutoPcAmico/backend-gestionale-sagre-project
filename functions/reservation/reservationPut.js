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
    resDetail.coverCharge === undefined ||
    !resDetail.name ||
    resDetail.isPayed === undefined
  ) {
    return {
      error: true,
      data: "No reservation details!",
      status: 400,
    };
  }

  //preparing sql statements
  var sqlAddReservation = `INSERT INTO prenotazione (tavolo, coperti, nominativo, isPagato) VALUES (?,?,?,?);`;
  var sqlAddBeverages = `INSERT INTO erogazione (idPrenotazione, idBevanda, quantita, noteErogazione, prezzoSingoloPagato) VALUES ?;`;
  var sqlAddFoods = `INSERT INTO preparazione (idPrenotazione, idCibo, quantita, notePreparazione, prezzoSingoloPagato) VALUES ?;`;

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
      ]);
  } catch (err) {
    result.error = true;
    result.data = `${err.message}\nError while saving reservation details`;
    result.status = 400;
  }

  //check if required beverages
  if (!result.error && beverages && beverages.length > 0) {
    const formattedBeverages = await Promise.all(
      beverages.map(async (single) => {
        const price = await getPriceOfBeverages([single.idBeverage]);
        return [
          resultReservation[0].insertId,
          single.idBeverage,
          single.quantity,
          single.notes,
          price[0].totalPrice,
        ];
      })
    );

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
    const formattedFoods = await Promise.all(
      foods.map(async (single) => {
        const price = await getPriceOfFoods([single.idFood]);
        return [
          resultReservation[0].insertId,
          single.idFood,
          single.quantity,
          single.notes,
          price[0].totalPrice,
        ];
      })
    );

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
