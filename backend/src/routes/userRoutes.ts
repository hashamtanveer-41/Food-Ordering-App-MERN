import express from "express";
import {createUser} from "../controllers/userController.ts";

const router = express.Router();

router.post("/", createUser);

export default router;