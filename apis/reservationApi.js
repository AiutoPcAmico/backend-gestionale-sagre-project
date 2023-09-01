import { deleteBevRes } from "../functions/reservation/beverages/apisFunctions/dispensingDelete.js";
import {
  getAllDispensing,
  getDispensingOfCategory,
  getDispensingOfReservation,
} from "../functions/reservation/beverages/apisFunctions/dispensingGet.js";
import {
  deliverBeverage,
  updateDispensingQty,
} from "../functions/reservation/beverages/apisFunctions/dispensingPost.js";

import { deleteFoodRes } from "../functions/reservation/foods/apisFunctions/preparationsDelete.js";
import {
  getPreparations,
  getPreparationsOfCategory,
  getPreparationsOfReservation,
} from "../functions/reservation/foods/apisFunctions/preparationsGet.js";
import {
  deliverFood,
  updatePreparationQty,
} from "../functions/reservation/foods/apisFunctions/preparationsPost.js";

import { getAllReservation } from "../functions/reservation/reservationGet.js";
import { addCompleteReservation } from "../functions/reservation/reservationPut.js";
import { changeIsPaid } from "../functions/reservation/reservationPost.js";

async function apiGetAllReservations(req, res) {
  console.log("[GET] - Get all reservations");
  const response = await getAllReservation();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiPutCompleteReservation(req, res) {
  console.log("[PUT] - Add complete reservation with food and beverage");
  const response = await addCompleteReservation(
    req.body.reservation,
    req.body.foods,
    req.body.beverages
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiUpdateIsPaid(req, res) {
  console.log(
    "[UPDATE] - Setting isPaid for reservation  " +
      req.body?.idReservation +
      " to " +
      req.body?.isPaid
  );
  const response = await changeIsPaid(
    req.body?.isPaid,
    req.body?.idReservation
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

/*    ----------------------
 *     FOOD RESERVATIONS APIs
 *     ----------------------
 */
async function apiGetPreparations(req, res) {
  console.log("[GET] - Get all preparations");
  const response = await getPreparations();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetPrepReservation(req, res) {
  console.log("[GET] - Get preparations of reservation id " + req.params.id);
  const response = await getPreparationsOfReservation(req.params.id);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiDeletePreparation(req, res) {
  console.log("[DELETE] - Removing preparation from a reservation");
  const response = await deleteFoodRes(
    req.params?.reservationId,
    req.params?.foodId
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiUpdatePreparationTotQty(req, res) {
  console.log(
    "[POST] - Updating total quantity of preparation idReservation " +
      req.params?.idReservation +
      " and idFood " +
      req.params?.idFood
  );
  const response = await updatePreparationQty(
    req.params?.idReservation,
    req.params?.idFood,
    req.params?.quantity
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiUpdateDeliveringFoodQty(req, res) {
  console.log(req.body);

  console.log(
    "[POST] - Delivering quantity " +
      req.body?.quantityDelivered +
      " for food " +
      req.body?.idFood +
      " reservation id " +
      req.body?.idReservation
  );
  const response = await deliverFood(
    req.body?.idReservation,
    req.body?.idFood,
    req.body?.quantityDelivered
  );

  console.log(response);
  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

/*    ----------------------
 *     BEVERAGES RESERVATIONS APIs
 *     ----------------------
 */
async function apiGetDispensing(req, res) {
  console.log("[GET] - Get all dispensing");
  const response = await getAllDispensing();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetDispReservation(req, res) {
  console.log("[GET] - Get dispensing of reservation id " + req.params.id);
  const response = await getDispensingOfReservation(req.params.id);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiDeleteDispensing(req, res) {
  console.log("[DELETE] - Removing dispensing from a reservation");
  const response = await deleteBevRes(
    req.params?.reservationId,
    req.params?.beverageId
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiUpdateDispensingTotQty(req, res) {
  console.log(
    "[POST] - Updating total quantity of preparation idReservation " +
      req.params?.idReservation +
      " and idFood " +
      req.params?.idBeverage
  );

  const response = await updateDispensingQty(
    req.params?.idReservation,
    req.params?.idBeverage,
    req.params?.quantity
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiUpdateDeliverBeverage(req, res) {
  console.log(req.body);
  console.log(
    "[POST] - Delivering " +
      req.body?.quantityDelivered +
      " beverage with id " +
      req.body?.idBeverage +
      " for reservation id " +
      req.body?.idReservation
  );

  const response = await deliverBeverage(
    req.body?.idReservation,
    req.body?.idBeverage,
    req.body?.quantityDelivered
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetDispensingOfCategory(req, res) {
  console.log(
    "[GET] - Retrieve list of dispensing for  " + req.params?.category
  );

  const response = await getDispensingOfCategory(req.params?.category);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetPreparationsOfCategory(req, res) {
  console.log(
    "[GET] - Retrieve list of preparations for  " + req.params?.category
  );

  const response = await getPreparationsOfCategory(req.params?.category);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export {
  apiGetAllReservations,
  apiPutCompleteReservation,
  apiUpdateIsPaid,
  apiGetPreparations,
  apiGetDispensing,
  apiGetDispReservation,
  apiGetPrepReservation,
  apiDeleteDispensing,
  apiDeletePreparation,
  apiUpdatePreparationTotQty,
  apiUpdateDeliveringFoodQty,
  apiUpdateDispensingTotQty,
  apiUpdateDeliverBeverage,
  apiGetDispensingOfCategory,
  apiGetPreparationsOfCategory,
};
