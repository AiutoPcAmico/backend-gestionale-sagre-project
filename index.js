import express from "express";
import cors from "cors";
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
  console.log(`Example app listening at http://localhost:${port}`);
});
