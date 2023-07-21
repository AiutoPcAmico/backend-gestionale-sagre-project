import { getAvailableFoods } from "../functions/foods/foodsGet.js";

async function apiGetAllFoods(req, res) {
  console.log("\n\n[GET] - Get all available foods");
  const response = await getAvailableFoods();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllFoods };
