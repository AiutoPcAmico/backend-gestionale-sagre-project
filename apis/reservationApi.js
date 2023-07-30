import {
  getAllDispensing,
  getDispensingOfReservation,
} from "../functions/reservation/beverages/dispensingGet.js";
import {
  getPreparations,
  getPreparationsOfReservation,
} from "../functions/reservation/foods/preparationsGet.js";
import { getAllReservation } from "../functions/reservation/reservationGet.js";
import { addCompleteReservation } from "../functions/reservation/reservationPut.js";

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

async function apiGetPrepReservation(req, res) {
  console.log("[GET] - Get preparations of reservation id " + req.params.id);
  const response = await getPreparationsOfReservation(req.params.id);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export {
  apiGetAllReservations,
  apiPutCompleteReservation,
  apiGetPreparations,
  apiGetDispensing,
  apiGetDispReservation,
  apiGetPrepReservation,
};
