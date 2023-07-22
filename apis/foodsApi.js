import {
  getAvailableFoods,
  getPreparations,
} from "../functions/foods/foodsGet.js";

async function apiGetAllFoods(req, res) {
  console.log("[GET] - Get all available foods");
  const response = await getAvailableFoods();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetPreparations(req, res) {
  console.log("[GET] - Get all preparations");
  const response = await getPreparations();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllFoods, apiGetPreparations };
