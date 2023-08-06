import { dbSagre } from "../../mysql/dbConnection.js";

async function getAllReservation() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = `
          SELECT 
	          prenotazione.idPrenotazione, 
            prenotazione.dataOra, 
            prenotazione.tavolo, 
            prenotazione.coperti, 
            prenotazione.nominativo, 
            prenotazione.isPagato, 
            prenotazione.isConcluso, 
            (
		          SELECT SUM(erogazione.prezzoSingoloPagato*erogazione.quantita) as totaleBevande
                FROM erogazione
                WHERE erogazione.idPrenotazione=prenotazione.idPrenotazione
            ) as totaleBevande,
            (
		          SELECT SUM(preparazione.prezzoSingoloPagato*preparazione.quantita) as totaleCibi
                FROM preparazione
                WHERE preparazione.idPrenotazione=prenotazione.idPrenotazione
            ) as totaleCibi
            FROM prenotazione 
`;
  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No reservation found!";
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

export { getAllReservation };
