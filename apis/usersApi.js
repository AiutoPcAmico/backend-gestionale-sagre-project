import { getUsers } from "../functions/users/users.js";

async function apiGetAllUsers(req, res) {
  console.log("[GET] - Required allUsers");
  const response = await getUsers();
  res.status(200).send(response);
}

export { apiGetAllUsers };
