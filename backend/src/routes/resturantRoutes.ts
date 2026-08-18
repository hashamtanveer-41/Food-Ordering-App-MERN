import express from "express";
import {
    createRestaurant,
    getRestaurant, getRestaurantById, getRestaurantOrders,
    searchRestaurants,
    updateRestaurant
} from "../controllers/resturantController.ts";
import multer from "multer";
import {jwtCheck, jwtParse} from "../middlewares/auth.ts";
import {validateUserRequest} from "../middlewares/validation.ts";
import {param} from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 ,

    }
});

router.get("/order", jwtCheck, jwtParse, getRestaurantOrders)
router.post("/",jwtCheck, jwtParse, upload.single("imageFile"), validateUserRequest, createRestaurant)
router.get("/", jwtCheck, jwtParse,getRestaurant)
router.put("/", jwtCheck, jwtParse, upload.single("imageFile"),validateUserRequest, updateRestaurant)
router.get(
    "/search/:city",
    param("city").isString().trim().notEmpty().withMessage("City parameter must be a valid string"),
    searchRestaurants
);
router.get("/:restaurantId",
    param("restaurantId").isString().trim().notEmpty().withMessage("Restaurant ID parameter must be a valid string"),
    getRestaurantById
);

export default router;
