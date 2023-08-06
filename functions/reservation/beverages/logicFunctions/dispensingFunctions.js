import { dbSagre } from "../../../../mysql/dbConnection.js";

//Getting required quantity of Beverage for specific Reservation
async function getQuantityBeverageRequired(idReservation, idBeverage) {
  var sql = `
            SELECT 	quantita
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
        "Quantità delle bevande richieste non trovata! IdReservation: " +
          idReservation +
          " idBeverage " +
          idBeverage
      );
      return undefined;
    } else {
      return value[0][0].quantita;
    }
  } catch (error) {
    //se errore
    console.log(
      "Errore generico durante il recupero delle bevande richieste\n" + error
    );
    return undefined;
  }
}

export { getQuantityBeverageRequired };
