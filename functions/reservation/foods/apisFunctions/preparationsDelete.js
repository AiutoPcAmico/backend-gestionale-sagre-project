import { dbSagre } from "../../../../mysql/dbConnection.js";

async function deleteFoodRes(idReservation, idFood) {
  if (!idReservation || !idFood) {
    return {
      error: true,
      data: "Invalid request. Some params are missing!",
      status: 400,
    };
  }

  var result = {
    error: false,
    data: null,
    status: null,
  };

  try {
    await dbSagre.promise().beginTransaction();
  } catch (err) {
    result.error = true;
    result.data = err;
    result.status = 500;
  }

  var sql = `
           DELETE FROM preparazione
           WHERE 
              idPrenotazione=? AND 
              idCibo=?
  `;

  var resultDelete = null;
  if (!result.error) {
    try {
      resultDelete = await dbSagre
        .promise()
        .query(sql, [idReservation, idFood]);

      if (resultDelete[0].affectedRows <= 0) {
        //no valori
        result.error = true;
        result.data = "Deletion not found!";
        result.status = 404;
      } else {
        result.error = false;
        result.data = "Deleted Successfully!";
        result.status = 202;
      }
    } catch (error) {
      result.error = true;
      result.data = error.message;
      result.status = 500;
    }
  }

  if (result.error === false) {
    await dbSagre.promise().commit();
  } else {
    await dbSagre.promise().rollback();
  }

  return result;
}

export { deleteFoodRes };
