import express from "express";
import { apiGetAllUsers, apiGetUserRole } from "../apis/usersApi.js";
const router = express.Router();

//exampleRoute
router.get("/allUsers", apiGetAllUsers);
router.get("/userRole/:id", apiGetUserRole);

export { router };
