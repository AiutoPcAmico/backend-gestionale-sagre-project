import { getUsers } from "../functions/users/users.js";

async function apiGetAllUsers(req, res) {
  console.log("[GET] - Required allUsers");
  const response = await getUsers();

  if (response.error) {
    res.status(500).send(response);
  } else {
    res.status(200).send(response);
  }
}

export { apiGetAllUsers };
