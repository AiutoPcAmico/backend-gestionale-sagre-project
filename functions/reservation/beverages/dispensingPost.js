import { dbSagre } from "../../../mysql/dbConnection.js";
import { updateTotal } from "../../../utils/updateReservationTotal.js";
import { getPriceOfBeverages } from "../../beverage/beverageGet.js";
import { getQuantityResBev } from "./dispensingGet.js";

async function updateDispensingQty(idReservation, idBeverage, quantity) {
  var response = {
    data: null,
    error: null,
    status: null,
  };

  //checking if params passed
  if (!idReservation || !idBeverage || !quantity || quantity <= 0) {
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
    quantityInDB = await getQuantityResBev(idReservation, idBeverage);
  } catch (error) {
    result.error = true;
    result.data = err;
    result.status = 500;
  }

  var resultUpdate = undefined;
  try {
    const sqlUpdate = `
            UPDATE erogazione
            SET 
                quantita=?,
                isTerminato=0
            WHERE
                idPrenotazione=? AND
                idBevanda=?
        `;

    resultUpdate = await dbSagre
      .promise()
      .query(sqlUpdate, [quantity, idReservation, idBeverage]);

    if (resultUpdate[0].affectedRows === 1) {
      response.data = "Total quantity updated correctly";
      response.status = 200;
      response.error = false;
    } else {
      response.data = "Dispensing not found!";
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
      const price = await getPriceOfBeverages([idBeverage]);
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
    response.data = "Dispensing quantity updated correctly!";
    response.status = 200;
  } else {
    await dbSagre.promise().rollback();
  }

  return response;
}

async function deliverBeverage(idReservation, idBeverage, quantityDelivered) {
  var response = {
    error: null,
    data: null,
    status: null,
  };

  if (
    !idReservation ||
    !idBeverage ||
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
    quantityInDB = await getQuantityResBev(idReservation, idBeverage);

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
            UPDATE erogazione
            SET 
                consegnate=?,
                isTerminato=?
            WHERE
                idPrenotazione=? AND
                idBevanda=?
        `;

      const resultDeliver = await dbSagre
        .promise()
        .query(sqlUpdateDelivered, [
          quantityDelivered,
          deliverFinished,
          idReservation,
          idBeverage,
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

export { updateDispensingQty, deliverBeverage };
