import { dbSagre } from "../../mysql/dbConnection.js";

async function getRoles() {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  var sql = "SELECT * from ruolo";
  try {
    const value = await dbSagre.promise().query(sql);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No roles found!";
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

async function getMyPages(roleName) {
  var result = {
    error: false,
    data: null,
    status: null,
  };

  if (!roleName) {
    return {
      error: true,
      data: "No roleName found in Authorization token!",
      status: 400,
    };
  }

  var sqlMyPages = `
  SELECT 
	pagina.idPagina, 
    pagina.percorso, 
    pagina.nome, 
    pagina.tipo,
    pagina.navVisibile
  FROM (
	      pagina 
	      INNER JOIN vista
        ON pagina.idPagina = vista.idPagina
	    )
	    INNER JOIN ruolo
	    ON vista.idRuolo= ruolo.idRuolo
  WHERE nomeRuolo=?`;

  try {
    const value = await dbSagre.promise().query(sqlMyPages, [roleName]);
    if (value[0].length <= 0) {
      //no valori
      result.error = true;
      result.data = "No pages found for role " + roleName + "!";
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

export { getRoles, getMyPages };
