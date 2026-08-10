import {body, validationResult} from "express-validator";
import type {Request,Response, NextFunction} from "express";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
export const validateUserRequest = [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("addressLine1").optional().isString().withMessage("Address Line 1 must be a string"),
    body("country").optional().isString().withMessage("Country must be a string"),
    body("city").optional().isString().withMessage("City must be a string"),
    handleValidationErrors,
];

export const validateRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required").isString().withMessage("Name must be a string"),
    body("country").notEmpty().withMessage("Country is required").isString().withMessage("Country must be a string"),
    body("city").notEmpty().withMessage("City is required").isString().withMessage("City must be a string"),
    body("deliveryPrice").notEmpty().withMessage("Delivery price is required").isFloat({min: 0}).withMessage("Delivery price must be a positive number"),
    body("estimateDeliveryTime").notEmpty().withMessage("Estimate delivery time is required").isInt({min: 0}).withMessage("Estimate delivery time must be a positive number"),
    body("cuisines").isArray({min: 1}).withMessage("Cuisines must be an array with at least one item"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu items name is required.").isString().withMessage("Menu item name must be a string"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("Menu item price must be a positive number").notEmpty().withMessage("Menu items name is required."),
    handleValidationErrors,
];