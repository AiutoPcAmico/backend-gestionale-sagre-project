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

async function getPriceOfBeverages(listBeverages) {
  try {
    const sqlPrices =
      "SELECT SUM(prezzo) as totalPrice FROM bevanda where idBevanda in (?);";
    const result = await dbSagre.promise().query(sqlPrices, [listBeverages]);
    return result[0];
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export { getAvailableBeverages, getPriceOfBeverages };
