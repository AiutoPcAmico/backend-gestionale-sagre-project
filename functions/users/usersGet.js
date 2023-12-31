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

async function getUserRole(username) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql =
    "SELECT  ruolo.nomeRuolo from utente left join ruolo ON utente.idRuolo = ruolo.idRuolo WHERE utente.username=?";
  try {
    const value = await dbSagre.promise().query(sql, [username]);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "User with username " + username + " not found!";
      result.status = 404;
    } else {
      result.error = false;
      result.data = value[0][0].nomeRuolo;
      result.status = 200;
    }
  } catch (error) {
    result.error = true;
    result.data =
      "Error while retreiving role. Passed username was " + username;
    result.status = 500;
  }

  return result;
}

async function getUsersPublic() {
  var users = {
    error: false,
    data: null,
    status: 200,
  };

  var sql = "select utente.idUtente, utente.nome, utente.username from utente";

  /* var sql =
    "select utente.idUtente, utente.nome, utente.username, ruolo.nomeRuolo from utente left join ruolo on ruolo.idRuolo=utente.idUtente";
  */
  try {
    const results = await dbSagre.promise().query(sql);
    if (results[0].length <= 0) {
      //no valori
      users.error = true;
      users.data = "No users found!";
    }

    users.error = false;
    users.data = results[0];
    users.status = 200;
  } catch (error) {
    users.error = true;
    users.data = error.message;
    users.status = 500;
  }

  return users;
}

export { getUsersPublic, getUserRole };
