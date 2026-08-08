import type { Request, Response } from "express";
import User from "../models/user.ts";

export const createUser =async (req: Request, res: Response)=>{
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({auth0Id});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
       const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json(newUser.toObject());

    }catch (err){
        console.log(err);
        res.status(500).json({message: "Error Creating User"})
    }
}

export const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;
        await user.save();
        return res.status(200).json(user.toObject());
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating user" });
    }
}