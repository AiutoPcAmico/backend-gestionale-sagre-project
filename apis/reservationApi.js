import { getAllDispensing } from "../functions/reservation/beverages/dispensingGet.js";
import { getPreparations } from "../functions/reservation/foods/preparationsGet.js";
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

export {
  apiGetAllReservations,
  apiPutCompleteReservation,
  apiGetPreparations,
  apiGetDispensing,
};
