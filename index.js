import {} from "./utils/loadDotenv.js";
import express from "express";
import cors from "cors";
import {} from "./mysql/dbConnection.js";
import { router } from "./router/router.js";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//routes
app.use("/api", router);

app.listen(port, () => {
  console.log(`Sagre backend listening at http://192.168.1.17:${port}`);
});
