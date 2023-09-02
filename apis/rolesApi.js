import { getMyPages, getRoles } from "../functions/roles/rolesGet.js";

async function apiGetRoles(req, res) {
  console.log("[GET] - Get all roles");
  const response = await getRoles();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetMyPages(req, res) {
  console.log("[GET] - users pages");
  const token = req.headers["authorization"];

  const tokenData = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  const response = await getMyPages(tokenData?.role);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetRoles, apiGetMyPages };
