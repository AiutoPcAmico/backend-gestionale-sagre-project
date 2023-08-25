import { dbSagre } from "../../../../mysql/dbConnection.js";
import { waitforme } from "../../../../utils/wait.js";

//CALLED
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

//CALLED
async function getDispensingOfReservation(idReservation) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
            SELECT 	
                    prenotazione.idPrenotazione, tavolo, nominativo,erogazione.isTerminato, prenotazione.dataOra,
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

async function getDispensingOfCategory(categoryName) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  if (!categoryName || categoryName === "") {
    return {
      status: 400,
      data: "Category not passed to SQL!",
      isError: true,
    };
  }

  const sql = `SELECT 	
                    bevanda.idBevanda as idProdotto, 
                    erogazione.quantita, 
                    erogazione.consegnate, 
                    erogazione.isTerminato, 
                    erogazione.noteErogazione as note, 
                    bevanda.nomeBevanda as nomeProdotto, 
                    bevanda.descrizione, 
                    bevanda.immagine, 
                    prenotazione.dataOra, 
                    prenotazione.tavolo, 
                    prenotazione.nominativo,
                    prenotazione.idPrenotazione
              FROM erogazione
              inner join bevanda on 
              	erogazione.idBevanda= bevanda.idBevanda 
              inner join categoria on 
              	bevanda.idCategoria= categoria.idCategoria
              inner join prenotazione on
              	prenotazione.idPrenotazione= erogazione.idPrenotazione
              WHERE 
                    categoria.nomeCategoria=?
                    AND erogazione.isTerminato= false
              ORDER BY dataOra ASC;
              `;

  try {
    const value = await dbSagre.promise().query(sql, [categoryName]);

    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data =
        "No dispensing for category " + categoryName + " yet! Please, wait!";
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

  await waitforme(500);
  return result;
}

export {
  getAllDispensing,
  getDispensingOfReservation,
  getDispensingOfCategory,
};
