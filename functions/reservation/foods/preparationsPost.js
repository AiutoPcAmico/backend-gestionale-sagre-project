import { dbSagre } from "../../../mysql/dbConnection.js";
import { updateTotal } from "../../../utils/updateReservationTotal.js";
import { getPriceOfFoods } from "../../foods/foodsGet.js";
import { getQuantityResFood } from "./preparationsGet.js";

async function updatePreparationQty(idReservation, idFood, quantity) {
  var response = {
    data: null,
    error: null,
    status: null,
  };

  //checking if params passed
  if (!idReservation || !idFood || !quantity || quantity <= 0) {
    return {
      error: true,
      data: "Invalid request. Some params are missing or incorrect!",
      status: 400,
    };
  }

  try {
    await dbSagre.promise().beginTransaction();
  } catch (err) {
    result.error = true;
    result.data = err;
    result.status = 500;
  }

  //retrieving quantity for that food in that reservation
  var quantityInDB = undefined;
  try {
    quantityInDB = await getQuantityResFood(idReservation, idFood);
  } catch (error) {
    result.error = true;
    result.data = err;
    result.status = 500;
  }

  var resultUpdate = undefined;
  try {
    const sqlUpdate = `
            UPDATE preparazione
            SET 
                quantita=?,
                isTerminato=0
            WHERE
                idPrenotazione=? AND
                idCibo=?
        `;

    resultUpdate = await dbSagre
      .promise()
      .query(sqlUpdate, [quantity, idReservation, idFood]);

    if (resultUpdate[0].affectedRows === 1) {
      response.data = "Total quantity updated correctly";
      response.status = 200;
      response.error = false;
    } else {
      response.data = "Preparation not found!";
      response.status = 404;
      response.error = true;
    }
  } catch (error) {
    response.data = error.message;
    response.error = true;
    response.status = 500;
  }

  if (response.error === false && resultUpdate[0].affectedRows === 1) {
    //updating price of reservation
    try {
      const price = await getPriceOfFoods([idFood]);
      console.log("updating reservation price...");
      const priceUpdated = await updateTotal(
        idReservation,
        parseFloat(price[0].totalPrice * (quantity - quantityInDB))
      );

      if (priceUpdated.status === 201) {
        response.status = priceUpdated.status;
        response.error = false;
        response.data = priceUpdated.data;
      } else {
        result = priceUpdated;
      }
    } catch (error) {
      response.status = 500;
      response.data = error.message;
      response.error = true;
    }
  }

  if (response.error === false) {
    await dbSagre.promise().commit();
    response.err = false;
    response.data = "Preparation quantity updated correctly!";
    response.status = 200;
  } else {
    await dbSagre.promise().rollback();
  }

  return response;
}

async function deliverFood(idReservation, idFood, quantityDelivered) {
  var response = {
    error: null,
    data: null,
    status: null,
  };

  if (
    !idReservation ||
    !idFood ||
    !quantityDelivered ||
    quantityDelivered < 0
  ) {
    return {
      error: true,
      status: 400,
      data: "Invalid request. Some params are invalid or not provided",
    };
  }

  var quantityInDB = undefined;
  try {
    quantityInDB = await getQuantityResFood(idReservation, idFood);

    if (quantityDelivered > quantityInDB) {
      response.error = true;
      response.status = 400;
      response.data = "Cannot deliver more food that requested!";
    } else {
      response.error = false;
    }
  } catch (error) {
    return {
      error: true,
      data: error.message,
      status: 500,
    };
  }

  if (response.error === false) {
    //verify if I terminated that delivering
    var deliverFinished = undefined;
    if (quantityInDB == quantityDelivered) deliverFinished = true;
    else deliverFinished = false;

    try {
      const sqlUpdateDelivered = `
            UPDATE preparazione
            SET 
                consegnate=?,
                isTerminato=?
            WHERE
                idPrenotazione=? AND
                idCibo=?
        `;

      const resultDeliver = await dbSagre
        .promise()
        .query(sqlUpdateDelivered, [
          quantityDelivered,
          deliverFinished,
          idReservation,
          idFood,
        ]);

      if (resultDeliver[0].affectedRows === 1) {
        response.error = false;
        response.status = 200;
        response.data = "Deliver updated correctly!";
      } else {
        response.data = "Deliver not found!";
        response.status = 404;
        response.error = true;
      }
    } catch (error) {
      response.error = true;
      response.data = error.message;
      response.status = 500;
    }
  }

  return response;
}

export { updatePreparationQty, deliverFood };
