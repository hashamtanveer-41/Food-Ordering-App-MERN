import type { Request, Response } from "express";
import Restaurant from "../models/restaurant.ts";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const uploadImage = async (image: Express.Multer.File) => {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.secure_url;
}
export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({user: req.userId as string});
        if (existingRestaurant) {
            return res.status(409).json({ message: "User restaurant alreadyExist"});
        }
        const imageUrl = await uploadImage(req.file as Express.Multer.File);

        const newRestaurant = new Restaurant(req.body)
        newRestaurant.imageUrl = imageUrl;
        newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
        await newRestaurant.save();
        res.status(201).json({ message: "Restaurant created successfully", restaurant: newRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getRestaurant = async (req: Request, res: Response) =>{
    try {
        const restaurant = await Restaurant.findOne({user: req.userId as string});
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json({ restaurant });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId as string});
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"});
        }
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdate = new Date();

        if (req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        res.status(200).json({ message: "Restaurant updated successfully", restaurant });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}