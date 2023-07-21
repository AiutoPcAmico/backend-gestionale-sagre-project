import { getAvailableBeverages } from "../functions/beverage/beverageGet.js";

async function apiGetAllBeverages(req, res) {
  console.log("\n\n[GET] - Get all available foods");
  const response = await getAvailableBeverages();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllBeverages };
