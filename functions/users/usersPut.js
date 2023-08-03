import { dbSagre } from "../../mysql/dbConnection.js";
import { encryptPassword } from "../../utils/encryptInfo.js";

async function addUser(name, username, plainPassword, idRole) {
  var result = {
    status: null,
    data: null,
    error: false,
  };

  const criptedPassword = await encryptPassword(plainPassword);

  var sql = `INSERT INTO utente (nome, username, password, idRuolo) VALUES (?,?,?,?);`;
  console.log("ID ROLE: " + idRole);
  try {
    const value = await dbSagre
      .promise()
      .query(sql, [name, username, criptedPassword, idRole]);

    if (value[0].affectedRows > 0) {
      result.error = false;
      result.data = "users added!";
      result.status = 201;
    } else {
      result.error = true;
      result.data = "No user added. Maybe invalid request?";
      result.status = 400;
    }
  } catch (error) {
    result.error = true;
    result.data = error.message;
    result.status = 500;
  }
  return result;
}

export { addUser };
