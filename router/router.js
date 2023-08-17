import express from "express";
import {
  apiGetAllUsersPublic,
  apiGetUserRole,
  apiPutNewUser,
} from "../apis/usersApi.js";
import { apiGetRoles } from "../apis/rolesApi.js";
import { apiPostLoginBearer } from "../apis/auth.js";
import { authenticateToken } from "./authMiddleware.js";
import { apiGetAllFoods, apiPutAddFood } from "../apis/foodsApi.js";
import { apiGetAllBeverages, apiPutAddBeverage } from "../apis/BeveragesApi.js";
import { apiGetAllCategories } from "../apis/categoriesApi.js";
import {
  apiGetAllReservations,
  apiPutCompleteReservation,
  apiGetPreparations,
  apiGetDispensing,
  apiGetDispReservation,
  apiGetPrepReservation,
  apiDeleteDispensing,
  apiDeletePreparation,
  apiUpdatePreparationTotQty,
  apiUpdateDeliveringFoodQty,
  apiUpdateDispensingTotQty,
  apiUpdateDeliverBeverage,
  apiGetDispensingOfCategory,
  apiGetPreparationsOfCategory,
} from "../apis/reservationApi.js";

const router = express.Router();

/*    ----------------------
 *          AUTH ROUTES
 *     ----------------------
 */
router.post("/login", apiPostLoginBearer);

/*    ----------------------
 *          USER ROUTES
 *     ----------------------
 */
router.get("/users/allUsersPublic", apiGetAllUsersPublic);
router.get("/users/userRole/:id", authenticateToken, apiGetUserRole);
router.put("/users/addUser", authenticateToken, apiPutNewUser);

/*    ----------------------
 *          ROLES ROUTES
 *     ----------------------
 */
router.get("/roles/allRoles", authenticateToken, apiGetRoles);

/*    ----------------------
 *          FOODS ROUTES
 *     ----------------------
 */
router.get("/foods/allFoods", authenticateToken, apiGetAllFoods);
router.put("/foods/addFood", authenticateToken, apiPutAddFood);

/*    ----------------------
 *      BEVERAGES ROUTES
 *     ----------------------
 */
router.get("/beverages/allBeverages", authenticateToken, apiGetAllBeverages);
router.put("/beverages/addBeverage", authenticateToken, apiPutAddBeverage);

/*    ----------------------
 *       CATEGORIES ROUTES
 *     ----------------------
 */
router.get("/categories/allCategories", authenticateToken, apiGetAllCategories);

/*    ----------------------
 *       RESERVATIONS ROUTES
 *     ----------------------
 */
router.get(
  "/reservations/allReservations",
  authenticateToken,
  apiGetAllReservations
);
router.put(
  "/reservations/addCompleteReservation",
  authenticateToken,
  apiPutCompleteReservation
);

/*    ----------------------
 *       RESERVATIONS ROUTES
 *        |-> FOODS
 *     ----------------------
 */
router.get(
  "/reservations/foods/getPreparations",
  authenticateToken,
  apiGetPreparations
);

router.get(
  "/reservations/foods/getPreparations/:id",
  authenticateToken,
  apiGetPrepReservation
);

router.delete(
  "/reservations/foods/deletePreparation/:reservationId/:foodId",
  authenticateToken,
  apiDeletePreparation
);

router.post(
  "/reservations/foods/updateTotalQuantity/:idReservation/:idFood/:quantity",
  authenticateToken,
  apiUpdatePreparationTotQty
);

router.post(
  "/reservations/foods/updateDeliveryFood/:idReservation/:idFood/:quantityDelivered",
  authenticateToken,
  apiUpdateDeliveringFoodQty
);

router.get(
  "/reservations/foods/getOfCategory/:category",
  authenticateToken,
  apiGetPreparationsOfCategory
);

/*    ----------------------
 *       RESERVATIONS ROUTES
 *        |-> BEVERAGES
 *     ----------------------
 */
router.get(
  "/reservations/beverages/getDispensing",
  authenticateToken,
  apiGetDispensing
);

router.get(
  "/reservations/beverages/getDispensing/:id",
  authenticateToken,
  apiGetDispReservation
);

router.delete(
  "/reservations/beverages/deleteDispensing/:reservationId/:beverageId",
  authenticateToken,
  apiDeleteDispensing
);

router.post(
  "/reservations/beverages/updateTotalQuantity/:idReservation/:idBeverage/:quantity",
  authenticateToken,
  apiUpdateDispensingTotQty
);

router.post(
  "/reservations/beverages/updateDeliveryBeverage/:idReservation/:idBeverage/:quantityDelivered",
  authenticateToken,
  apiUpdateDeliverBeverage
);

router.get(
  "/reservations/beverages/getOfCategory/:category",
  authenticateToken,
  apiGetDispensingOfCategory
);

export { router };
