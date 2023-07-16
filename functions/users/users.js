import { dbSagre } from "../../mysql/dbConnection.js";
const users = [
  {
    name: "Andrea",
    surname: "felappi",
  },
  {
    name: "AiutoPcAmico",
    Surname: "Developer",
  },
];

async function getInfo(data) {
  return results[0];
}

async function getUsers(req, res) {
  var users = {
    error: false,
    data: null,
  };

  var sql = "SELECT * from user";
  try {
    const results = await dbSagre.promise().query(sql);

    users.error = false;
    users.data = results[0];
  } catch (error) {
    users.error = true;
    users.data = error.message;
  }

  return users;
}

export { getUsers };
