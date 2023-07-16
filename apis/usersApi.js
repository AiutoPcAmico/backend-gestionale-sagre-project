import { getUserRole, getUsers } from "../functions/users/users.js";

async function apiGetAllUsers(req, res) {
  console.log("[GET] - Required allUsers");
  const response = await getUsers();

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

async function apiGetUserRole(req, res) {
  console.log("[GET] - Required user role with userId " + req.params.id);
  const response = await getUserRole(req.params.id);

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

export { apiGetAllUsers, apiGetUserRole };
