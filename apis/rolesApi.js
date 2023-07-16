import { getRoles } from "../functions/roles/roles.js";

async function apiGetRoles(req, res) {
  console.log("[GET] - Get all roles");
  const response = await getRoles();

  if (response.error) {
    res
      .status(response.status)
      .send({ data: response.data, error: response.error });
  } else {
    res
      .status(response.status)
      .send({ data: response.data, error: response.error });
  }
}

export { apiGetRoles };
