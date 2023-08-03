import { dbSagre } from "../../../mysql/dbConnection.js";

async function getAllDispensing() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
            SELECT 	
                    prenotazione.idPrenotazione, tavolo, nominativo,erogazione.isTerminato, 
		                erogazione.quantita, erogazione.consegnate, erogazione.isTerminato, erogazione.noteErogazione,
		                bevanda.descrizione, bevanda.nomeBevanda 
            FROM (
	                  (
                      sagre_db.prenotazione 
		                  inner join erogazione
			                on erogazione.idPrenotazione= prenotazione.idPrenotazione
	                  )
                    inner join bevanda 
		                on bevanda.idBevanda= erogazione.idBevanda
                  );
  `;

  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No dispensing found! Wait for a new reservation!";
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

async function getDispensingOfReservation(idReservation) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
            SELECT 	
                    prenotazione.idPrenotazione, tavolo, nominativo,erogazione.isTerminato, 
		                erogazione.quantita, erogazione.consegnate, erogazione.isTerminato, erogazione.noteErogazione,
		                bevanda.descrizione, bevanda.nomeBevanda 
            FROM (
	                  (
                      sagre_db.prenotazione 
		                  inner join erogazione
			                on erogazione.idPrenotazione= prenotazione.idPrenotazione
	                  )
                    inner join bevanda 
		                on bevanda.idBevanda= erogazione.idBevanda
                  )
            WHERE
            prenotazione.idPrenotazione= ?;
  `;

  try {
    const value = await dbSagre.promise().query(sql, [idReservation]);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data =
        "No dispensing found!This reservation doesen't have beverages! Or the id specified doesen't exist!";
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

async function getQuantityResBev(idReservation, idBeverage) {
  var sql = `
            SELECT 	*
            FROM erogazione
            WHERE idPrenotazione=? AND idBevanda=?
                    
  `;

  try {
    const value = await dbSagre
      .promise()
      .query(sql, [idReservation, idBeverage]);
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

export { getAllDispensing, getDispensingOfReservation, getQuantityResBev };
