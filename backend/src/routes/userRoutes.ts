import express from "express";
import {createUser, getCurrentUser, updateCurrentUser} from "../controllers/userController.ts";
import {jwtCheck, jwtParse} from "../middlewares/auth.ts";
import {validateUserRequest} from "../middlewares/validation.ts";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, getCurrentUser)
router.post("/", jwtCheck, createUser);
router.put("/",jwtCheck, jwtParse, validateUserRequest, updateCurrentUser);

export default router;