import express from "express";
import {
  apiGetAllUsersPublic,
  apiGetUserRole,
  apiPutNewUser,
} from "../apis/usersApi.js";
import { apiGetRoles } from "../apis/rolesApi.js";
import { apiPostLoginBearer } from "../apis/auth.js";
import { authenticateToken } from "./authMiddleware.js";
import {
  apiGetAllFoods,
  apiGetPreparations,
  apiPutAddFood,
} from "../apis/foodsApi.js";
import {
  apiGetAllBeverages,
  apiGetDispensing,
  apiPutAddBeverage,
} from "../apis/BeveragesApi.js";
import { apiGetAllCategories } from "../apis/categoriesApi.js";
import { apiGetAllReservations } from "../apis/reservationApi.js";

const router = express.Router();

//auth Routes
router.post("/login", apiPostLoginBearer);

//Users ROutes
router.get("/users/allUsersPublic", apiGetAllUsersPublic);
router.get("/users/userRole/:id", authenticateToken, apiGetUserRole);
router.put("/users/addUser", authenticateToken, apiPutNewUser);

//Roles Routes
router.get("/roles/allRoles", authenticateToken, apiGetRoles);

//foods ROutes
router.get("/foods/allFoods", authenticateToken, apiGetAllFoods);
router.get("/foods/getPreparations", authenticateToken, apiGetPreparations);
router.put("/foods/addFood", authenticateToken, apiPutAddFood);

//beverages ROutes
router.get("/beverages/allBeverages", authenticateToken, apiGetAllBeverages);
router.get("/beverages/getDispensing", authenticateToken, apiGetDispensing);
router.put("/beverages/addBeverage", authenticateToken, apiPutAddBeverage);

//categories Routes
router.get("/categories/allCategories", authenticateToken, apiGetAllCategories);

//reservations Routes
router.get(
  "/reservations/allReservations",
  authenticateToken,
  apiGetAllReservations
);

export { router };
