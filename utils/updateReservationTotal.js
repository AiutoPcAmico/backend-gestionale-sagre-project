import { dbSagre } from "../mysql/dbConnection.js";

async function updateTotal(idReservation, howMuch) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
            UPDATE 
                prenotazione
            SET 
                totale=totale+(?)
            WHERE 
                prenotazione.idPrenotazione=? 
  `;

  try {
    const value = await dbSagre.promise().query(sql, [howMuch, idReservation]);

    if (value[0].affectedRows <= 0) {
      //no valori
      result.error = true;
      result.data = "Reservation not found during update price!";
      result.status = 404;
    } else {
      result.error = false;
      result.data = "Total price updated correctly!";
      result.status = 201;
    }
  } catch (error) {
    result.error = true;
    result.data = error.message;
    result.status = 500;
  }

  return result;
}

export { updateTotal };
