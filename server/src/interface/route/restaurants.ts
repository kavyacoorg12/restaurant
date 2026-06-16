import { Router } from "express";
import { restaurantsController } from "../../infrastructure/config/di";
import { restaurantInputValidation, restaurantUpdateValidation } from "../validator/restaurants";
import { validateSignedUrlRequest } from "../validator/imageValidator";
const router = Router();

router.get("/restaurants", restaurantsController.getAllRestaurants);
router.delete(
  "/restaurants/:restaurantId",
  restaurantsController.deleteRestaurants,
);
router.patch(
  "/restaurants/:restaurantId",restaurantUpdateValidation,
  restaurantsController.updateRestaurants,
);
router.post(
  "/restaurants",
  restaurantInputValidation,
  restaurantsController.addRestaurants,
);
router.post("/restaurants/signed-url",validateSignedUrlRequest, restaurantsController.getSignedUploadUrl)
export default router;
