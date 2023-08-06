import { dbSagre } from "../../../../mysql/dbConnection.js";
//called
async function getPreparations() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
            SELECT 	
                    prenotazione.idPrenotazione, prenotazione.tavolo, prenotazione.nominativo, 
		                preparazione.quantita, preparazione.consegnate, preparazione.isTerminato, preparazione.notePreparazione, 
                    cibo.nome, cibo.descrizione 
            FROM (
		                (
                      prenotazione
			                inner join preparazione
			                on preparazione.idPrenotazione= prenotazione.idPrenotazione
                    )
                    inner join cibo
			              on cibo.idCibo= preparazione.idCibo
	                );
  `;
  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No preparation found! Wait for a new reservation!";
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

//called
async function getPreparationsOfReservation(idReservation) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
            SELECT 	
                    prenotazione.idPrenotazione, prenotazione.tavolo, prenotazione.nominativo, 
		                preparazione.quantita, preparazione.consegnate, preparazione.isTerminato, preparazione.notePreparazione, 
                    cibo.nome, cibo.descrizione 
            FROM (
		                (
                      prenotazione
			                inner join preparazione
			                on preparazione.idPrenotazione= prenotazione.idPrenotazione
                    )
                    inner join cibo
			              on cibo.idCibo= preparazione.idCibo
	                )
            WHERE prenotazione.idPrenotazione=?;
  `;
  try {
    const value = await dbSagre.promise().query(sql, [idReservation]);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data =
        "No preparation found linked to this reservation! Or the specified ID doesen't exists!";
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

export { getPreparations, getPreparationsOfReservation };
