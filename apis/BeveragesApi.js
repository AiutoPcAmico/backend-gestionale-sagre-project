import {
  getAllDispensing,
  getAvailableBeverages,
} from "../functions/beverage/beverageGet.js";

async function apiGetAllBeverages(req, res) {
  console.log("[GET] - Get all available foods");
  const response = await getAvailableBeverages();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetDispensing(req, res) {
  console.log("[GET] - Get all dispensing");
  const response = await getAllDispensing();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllBeverages, apiGetDispensing };
