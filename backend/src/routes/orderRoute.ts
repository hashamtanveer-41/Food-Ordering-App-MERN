import express from "express";
import {jwtCheck, jwtParse} from "../middlewares/auth.ts";
import {createCheckoutSession} from "../controllers/orderController.ts";

const router = express.Router();

router.post("/checkout/create-checkout-session", jwtCheck, jwtParse, createCheckoutSession)

export default router;
