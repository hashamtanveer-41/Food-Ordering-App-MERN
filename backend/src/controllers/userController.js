import { Request, Response } from "express";
import User from "../models/user.js";
export const createUser = async (req, res) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error Creating User" });
    }
};
//# sourceMappingURL=userController.js.map