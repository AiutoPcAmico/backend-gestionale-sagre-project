import {
  getAvailableFoods,
  getPreparations,
} from "../functions/foods/foodsGet.js";
import { addFood } from "../functions/foods/foodsPut.js";

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

async function apiPutAddFood(req, res) {
  console.log("[PUT] - Add Food");
  const response = await addFood(
    req.body.name,
    req.body?.description,
    req.body?.price,
    req.body?.idCategory,
    req.body?.image
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllFoods, apiGetPreparations, apiPutAddFood };
