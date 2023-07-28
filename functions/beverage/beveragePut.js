import { dbSagre } from "../../mysql/dbConnection.js";

async function addBeverage(name, description, price, idCategory, image) {
  var result = {
    status: null,
    data: null,
    error: false,
  };

  var sql = `INSERT INTO bevanda(nomeBevanda, descrizione, prezzo, idCategoria, immagine) VALUES(?,?,?,?,?)`;
  try {
    const value = await dbSagre
      .promise()
      .query(sql, [name, description, price, idCategory, image]);

    if (value[0].affectedRows > 0) {
      result.error = false;
      result.data = "Beverages added!";
      result.status = 201;
    } else {
      result.error = true;
      result.data = "No beverage added. Maybe invalid request?";
      result.status = 400;
    }
  } catch (error) {
    result.error = true;
    result.data = error.message;
    result.status = 500;
  }
  return result;
}

export { addBeverage };
