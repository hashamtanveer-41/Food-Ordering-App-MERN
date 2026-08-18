import express from "express";
import {jwtCheck, jwtParse} from "../middlewares/auth.ts";
import {createCheckoutSession, getOrders, stripeWebhookHandler} from "../controllers/orderController.ts";

const router = express.Router();

router.post("/checkout/create-checkout-session", jwtCheck, jwtParse, createCheckoutSession)
router.post("/checkout/webhook", stripeWebhookHandler)
router.get("/", jwtCheck, jwtParse, getOrders)

export default router;
