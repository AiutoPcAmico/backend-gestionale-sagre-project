import { getUserRole, getUsersPublic } from "../functions/users/usersGet.js";
import { addUser } from "../functions/users/usersPut.js";

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

async function apiPutNewUser(req, res) {
  console.log("[PUT] - Added new User");
  const response = await addUser(
    req.body.name,
    req.body.username,
    req.body.password,
    req.body.idRole
  );

  res
    .status(response.status)
    .send({ data: response.data, error: response.error });
}

export { apiGetAllUsersPublic, apiGetUserRole, apiPutNewUser };
