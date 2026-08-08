import express from "express";
import {createUser, updateCurrentUser} from "../controllers/userController.ts";
import {jwtCheck, jwtParse} from "../middlewares/auth.ts";
import {validateUserRequest} from "../middlewares/validation.ts";

const router = express.Router();

router.post("/", jwtCheck, createUser);
router.put("/",jwtCheck, jwtParse, validateUserRequest, updateCurrentUser);

export default router;