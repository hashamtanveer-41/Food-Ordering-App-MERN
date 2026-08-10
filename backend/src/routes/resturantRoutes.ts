import express from "express";
import {createRestaurant} from "../controllers/resturantController.ts";
import multer from "multer";
import {jwtCheck, jwtParse} from "../middlewares/auth.ts";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 ,

    }
});

router.post("/",jwtCheck, jwtParse, upload.single("imageFile"), createRestaurant)

export default router;
