import { dbSagre } from "../../mysql/dbConnection.js";
import { waitforme } from "../../utils/wait.js";

async function changeIsPaid(isPaid, idReservation) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  if (
    idReservation === null ||
    idReservation === undefined ||
    isPaid === undefined ||
    isPaid === null
  ) {
    return {
      error: true,
      status: 400,
      data: "Invalid request. Some params are invalid or not provided",
    };
  }

  var sql = `
         UPDATE prenotazione 
         SET isPagato = ? 
         WHERE (idPrenotazione = ?);
 
`;
  try {
    const value = await dbSagre.promise().query(sql, [isPaid, idReservation]);
    if (value[0].affectedRows <= 0) {
      //no valori
      result.error = true;
      result.data = "Reservation with ID " + idReservation + " not found!";
      result.status = 404;
    } else {
      result.error = false;
      result.data =
        "Reservation with ID " + idReservation + " changed IsPaid to " + isPaid;
      result.status = 200;
    }
  } catch (error) {
    result.error = true;
    result.data = error.message;
    result.status = 500;
  }
  await waitforme(500);

  return result;
}

export { changeIsPaid };
