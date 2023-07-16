const express = require("express");
const app = express();

/*----------------------RESTAURANT API---------------------- */
app.get("/pippo", (request, response) => {
  return response.status(200).send({
    error: false,
    value: getListRestaurant(),
  });
});
