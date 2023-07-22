import { getAvailableCategories } from "../functions/categories/categoriesGet.js";

async function apiGetAllCategories(req, res) {
  console.log("[GET] - Get all available categories");
  const response = await getAvailableCategories();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllCategories };
