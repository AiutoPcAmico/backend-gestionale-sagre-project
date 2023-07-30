import { dbSagre } from "../../mysql/dbConnection.js";

async function getAvailableFoods() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = "SELECT * from cibo";
  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No foods found!";
      result.status = 404;
    } else {
      //if all is correct
      //I'm adding a value that permit to know if is a food or a drink
      value[0].forEach((element) => {
        element.type = "cibo";
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

async function getPriceOfFoods(listFoods) {
  try {
    const sqlPrices =
      "SELECT SUM(prezzo) as totalPrice FROM cibo where idCibo in (?);";
    const result = await dbSagre.promise().query(sqlPrices, [listFoods]);
    return result[0];
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export { getAvailableFoods, getPreparations, getPriceOfFoods };
