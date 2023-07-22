import { dbSagre } from "../../mysql/dbConnection.js";

async function getAllReservation() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = "SELECT * from prenotazione";
  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No reservation found!";
      result.status = 404;
    } else {
      result.error = false;
      result.data = value[0];
      result.status = 200;
    }
  } catch (error) {
    result.error = true;
    result.data = error.message;
    result.status = 500;
  }

  return result;
}

export { getAllReservation };
