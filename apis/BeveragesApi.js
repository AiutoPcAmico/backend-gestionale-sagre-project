import { getAvailableBeverages } from "../functions/beverage/beverageGet.js";
import { addBeverage } from "../functions/beverage/beveragePut.js";

async function apiGetAllBeverages(req, res) {
  console.log("[GET] - Get all available foods");
  const response = await getAvailableBeverages();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiPutAddBeverage(req, res) {
  console.log("[PUT] - Add Beverage");
  const response = await addBeverage(
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.idCategory,
    req.body.image
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllBeverages, apiPutAddBeverage };
