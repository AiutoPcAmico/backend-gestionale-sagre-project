import { getRoles } from "../functions/roles/rolesGet.js";

async function apiGetRoles(req, res) {
  console.log("[GET] - Get all roles");
  const response = await getRoles();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetRoles };
