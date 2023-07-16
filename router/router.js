import express from "express";
import { apiGetAllUsers } from "../apis/usersApi.js";
const router = express.Router();

//exampleRoute
router.get("/allUsers", apiGetAllUsers);

export { router };
