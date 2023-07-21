import express from "express";
import { apiGetAllUsersPublic, apiGetUserRole } from "../apis/usersApi.js";
import { apiGetRoles } from "../apis/rolesApi.js";
import { apiPostLoginBearer } from "../apis/auth.js";
import { authenticateToken } from "./authMiddleware.js";
import { apiGetAllFoods } from "../apis/foodsApi.js";
import { apiGetAllBeverages } from "../apis/BeveragesApi.js";

const router = express.Router();

//auth Routes
router.post("/login", apiPostLoginBearer);

//Users ROutes
router.get("/users/allUsersPublic", apiGetAllUsersPublic);
router.get("/users/userRole/:id", authenticateToken, apiGetUserRole);

//Roles Routes
router.get("/roles/allRoles", authenticateToken, apiGetRoles);

//foods ROutes
router.get("/foods/allFoods", authenticateToken, apiGetAllFoods);

//beverages ROutes
router.get("/beverages/allBeverages", authenticateToken, apiGetAllBeverages);

export { router };
