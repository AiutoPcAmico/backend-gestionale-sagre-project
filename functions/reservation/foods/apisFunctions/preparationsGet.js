import { dbSagre } from "../../../../mysql/dbConnection.js";
import { waitforme } from "../../../../utils/wait.js";
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
                    prenotazione.idPrenotazione, prenotazione.tavolo, prenotazione.nominativo, prenotazione.dataOra,
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

async function getPreparationsOfCategory(categoryName) {
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
                    cibo.idCibo as idProdotto,
		                preparazione.quantita, 
		                preparazione.consegnate, 
                    preparazione.isTerminato, 
                    preparazione.notePreparazione as note, 
                    cibo.nome as nomeProdotto, 
                    cibo.descrizione, 
                    cibo.immagine, 
                    prenotazione.dataOra, 
                    prenotazione.tavolo, 
                    prenotazione.nominativo,
                    prenotazione.idPrenotazione
              FROM preparazione
              inner join cibo on 
              	preparazione.idCibo= cibo.idCibo 
              inner join categoria on 
              	cibo.idCategoria= categoria.idCategoria
              inner join prenotazione on
              	prenotazione.idPrenotazione= preparazione.idPrenotazione
              WHERE 
                    categoria.nomeCategoria=?
                    AND preparazione.isTerminato= false
              ORDER BY dataOra ASC`;

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

  return result;
}

export {
  getPreparations,
  getPreparationsOfReservation,
  getPreparationsOfCategory,
};
