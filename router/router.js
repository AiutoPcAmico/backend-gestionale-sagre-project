import express from "express";
import { apiGetAllUsers, apiGetUserRole } from "../apis/usersApi.js";
import { apiGetRoles } from "../apis/rolesApi.js";
const router = express.Router();

//Users ROutes
router.get("/allUsers", apiGetAllUsers);
router.get("/userRole/:id", apiGetUserRole);

//Roles Routes
router.get("/allRoles", apiGetRoles);

export { router };
