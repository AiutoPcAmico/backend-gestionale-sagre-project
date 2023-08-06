import { dbSagre } from "../../../../mysql/dbConnection.js";
async function getQuantityFoodRequired(idReservation, idFood) {
  var sql = `
            SELECT 	quantita
            FROM preparazione
            WHERE idPrenotazione=? AND idCibo=?                 
  `;

  try {
    const value = await dbSagre.promise().query(sql, [idReservation, idFood]);
    if (value[0].length <= 0) {
      //no valori
      console.log(
        "Quantità del cibo richiesto non trovata! IdReservation: " +
          idReservation +
          " idFood " +
          idFood
      );
      return undefined;
    } else {
      return value[0][0].quantita;
    }
  } catch (error) {
    //se errore
    console.log("Errore generico durante il recupero del cibo\n" + error);
    return undefined;
  }
}

export { getQuantityFoodRequired };
