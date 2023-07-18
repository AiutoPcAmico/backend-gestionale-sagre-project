import express from "express";
import { apiGetAllUsers, apiGetUserRole } from "../apis/usersApi.js";
import { apiGetRoles } from "../apis/rolesApi.js";
import { apiPostLoginBearer } from "../apis/auth.js";
import { authenticateToken } from "./authMiddleware.js";
const router = express.Router();

//Users ROutes
router.get("/allUsers", apiGetAllUsers);
router.get("/userRole/:id", authenticateToken, apiGetUserRole);

//Roles Routes
router.get("/allRoles", authenticateToken, apiGetRoles);

//auth Routes
router.post("/login", apiPostLoginBearer);

export { router };
