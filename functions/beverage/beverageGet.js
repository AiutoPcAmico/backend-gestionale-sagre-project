import { dbSagre } from "../../mysql/dbConnection.js";

async function getAvailableBeverages() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = "SELECT * from bevanda";
  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No beverages found!";
      result.status = 404;
    } else {
      //if all is correct
      //I'm adding a value that permit to know if is a food or a drink
      value[0].forEach((element) => {
        element.type = "bevanda";
      });

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

async function getAllDispensing() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
            SELECT 	
                    prenotazione.idPrenotazione, tavolo, nominativo,erogazione.isTerminato, 
		                erogazione.quantita, erogazione.consegnate, erogazione.isTerminato, erogazione.noteErogazione
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

export { getAvailableBeverages, getAllDispensing };
