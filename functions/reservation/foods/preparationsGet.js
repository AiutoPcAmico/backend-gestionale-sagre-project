import { dbSagre } from "../../../mysql/dbConnection.js";

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

async function getQuantityResFood(idReservation, idFood) {
  var sql = `
            SELECT 	*
            FROM preparazione
            WHERE idPrenotazione=? AND idCibo=?
                    
  `;

  try {
    const value = await dbSagre.promise().query(sql, [idReservation, idFood]);
    if (value[0].length <= 0) {
      //no valori
      console.log(
        "Errore durante il recupero della quantità per calcolare il prezzo finale"
      );
      return undefined;
    } else {
      return value[0][0].quantita;
    }
  } catch (error) {
    //se errore
    console.log(
      "Errore durante il recupero della quantità per calcolare il prezzo finale"
    );
    return undefined;
  }
}

export { getPreparations, getPreparationsOfReservation, getQuantityResFood };
