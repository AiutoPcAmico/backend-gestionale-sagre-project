import { getUserRole, getUsersPublic } from "../functions/users/usersGet.js";

async function apiGetAllUsersPublic(req, res) {
  console.log("\n\n[GET] - Required allUsers without Auth");
  const response = await getUsersPublic();

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

async function apiGetUserRole(req, res) {
  console.log("[GET] - Required user role with userId " + req.params.id);
  const response = await getUserRole(req.params.id);

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllUsersPublic, apiGetUserRole };
