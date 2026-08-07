import express from "express";
import {createUser} from "../controllers/userController.ts";
import {jwtCheck} from "../middlewares/auth.ts";

const router = express.Router();

router.post("/", jwtCheck, createUser);

export default router;