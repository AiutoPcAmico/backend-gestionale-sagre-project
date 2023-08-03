import { dbSagre } from "../../../mysql/dbConnection.js";
import { updateTotal } from "../../../utils/updateReservationTotal.js";
import { getPriceOfBeverages } from "../../beverage/beverageGet.js";
import { getPriceOfFoods } from "../../foods/foodsGet.js";
import { getQuantityResFood } from "./preparationsGet.js";

async function deleteFoodRes(idReservation, idFood) {
  if (!idReservation || !idFood) {
    return {
      error: true,
      data: "Invalid request. Some params are missing!",
      status: 400,
    };
  }

  var result = {
    error: false,
    data: null,
    status: null,
  };

  try {
    await dbSagre.promise().beginTransaction();
  } catch (err) {
    result.error = true;
    result.data = err;
    result.status = 500;
  }

  //retrieving quantity for that food in that reservation
  var quantity = undefined;
  try {
    quantity = await getQuantityResFood(idReservation, idFood);
  } catch (error) {
    result.error = true;
    result.data = err;
    result.status = 500;
  }

  var sql = `
           DELETE FROM preparazione
           WHERE 
              idPrenotazione=? AND 
              idCibo=?
  `;

  var resultDelete = null;
  if (!result.error) {
    try {
      resultDelete = await dbSagre
        .promise()
        .query(sql, [idReservation, idFood]);

      if (resultDelete[0].affectedRows <= 0) {
        //no valori
        result.error = true;
        result.data = "Deletion not found!";
        result.status = 404;
      } else {
        result.error = false;
        result.data = "Deleted Successfully!";
        result.status = 202;
      }
    } catch (error) {
      result.error = true;
      result.data = error.message;
      result.status = 500;
    }
  }

  if (!result.error && resultDelete[0].affectedRows > 0) {
    //retrieve beverage price

    try {
      const price = await getPriceOfFoods([idFood]);
      console.log("updating reservation price...");
      const priceUpdated = await updateTotal(
        idReservation,
        parseFloat(-(price[0].totalPrice * quantity))
      );

      if (priceUpdated.status === 201) {
        result.status = priceUpdated.status;
        result.error = false;
        result.data = priceUpdated.data;
      } else {
        result = priceUpdated;
      }
    } catch (error) {
      result.status = 500;
      result.data = error.message;
      result.error = true;
    }
  }

  if (result.error === false) {
    await dbSagre.promise().commit();
    result.err = false;
    result.data = "Preparation deleted correctly!";
    result.status = 200;
  } else {
    await dbSagre.promise().rollback();
  }

  return result;
}

export { deleteFoodRes };
