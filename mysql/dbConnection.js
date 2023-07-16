import { createConnection } from "mysql2";
import util from "util";

console.log(process.env.DBHOST);

var dbSagre = createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

dbSagre.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

export { dbSagre };
