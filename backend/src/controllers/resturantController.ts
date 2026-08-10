import type { Request, Response } from "express";
import Restaurant from "../models/restaurant.ts";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.find({user: req.userId as string});
        if (existingRestaurant) {
            return res.status(409).json({ message: "User restaurant alreadyExist"});
        }
        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;
        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
        if (!image) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const { restaurantName, city, country, deliveryPrice, estimateDeliveryTime, cuisines, menuItems } = req.body;
        const newRestaurant = new Restaurant({
            user: new mongoose.Types.ObjectId(req.userId),
            restaurantName,
            city,
            country,
            deliveryPrice,
            estimateDeliveryTime,
            cuisines: cuisines.split(",").map((cuisine: string) => cuisine.trim()),
            menuItems: JSON.parse(menuItems),
            imageUrl: uploadResponse.url,
        });
        await newRestaurant.save();
        res.status(201).json({ message: "Restaurant created successfully", restaurant: newRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};