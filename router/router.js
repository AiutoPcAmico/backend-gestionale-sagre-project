import express from "express";
import { apiGetAllUsersPublic, apiGetUserRole } from "../apis/usersApi.js";
import { apiGetRoles } from "../apis/rolesApi.js";
import { apiPostLoginBearer } from "../apis/auth.js";
import { authenticateToken } from "./authMiddleware.js";
import { apiGetAllFoods, apiGetPreparations } from "../apis/foodsApi.js";
import { apiGetAllBeverages, apiGetDispensing } from "../apis/BeveragesApi.js";
import { apiGetAllCategories } from "../apis/categoriesApi.js";
import { apiGetAllReservations } from "../apis/reservationApi.js";

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
router.get("/foods/getPreparations", authenticateToken, apiGetPreparations);

//beverages ROutes
router.get("/beverages/allBeverages", authenticateToken, apiGetAllBeverages);
router.get("/beverages/getDispensing", authenticateToken, apiGetDispensing);

//categories Routes
router.get("/categories/allCategories", authenticateToken, apiGetAllCategories);

//reservations Routes
router.get(
  "/reservations/allReservations",
  authenticateToken,
  apiGetAllReservations
);

export { router };
