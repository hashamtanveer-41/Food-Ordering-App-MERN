import {body, validationResult} from "express-validator";
import type {Request,Response, NextFunction} from "express";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors) {
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