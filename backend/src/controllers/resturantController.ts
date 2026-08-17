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

export const getRestaurantById = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({message: "restaurant not found"})
        }
        return res.json(restaurant);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
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

export const searchRestaurants = async (req: Request, res: Response) => {
    try {
       const city = req.params.city;
       const searchQuery = (req.query.searchQuery as string) || "";
       const selectedCuisines = req.query.selectedCuisines as string || "";
       const sortOption = (req.query.sortOption as string) || "lastUpdate";
       const page = parseInt(req.query.page as string) || 1;
       const limit = parseInt(req.query.limit as string) || 10;

       let query: any = { };
       query["city"] = new RegExp(city as string, "i");
       const cityCheck = await Restaurant.countDocuments(query);
       if (cityCheck === 0){
           return res.status(404).json({
               data: [],
               pagination: {
                   total: 0,
                   page: 1,
                   pages: 1,
               }
           });
       }
       if (selectedCuisines){
              const cuisinesArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine, "i"));
              query["cuisines"] = { $all: cuisinesArray };
       }
       if (searchQuery){
           const searchRegex = new RegExp(searchQuery, "i");
           query["$or"] =[
               {restaurantName: searchRegex},
               {cuisines: {$in: [searchRegex]}}
           ];
       }
       const pageSize = 10;
       const skip = (page -1) * pageSize;
       const restaurants = await Restaurant.find(query).sort({[sortOption]: 1}).skip(skip).limit(pageSize).lean();
       const total = await Restaurant.countDocuments(query);
       const response = {
           data: restaurants,
           pagination: {
               total,
               page,
               pages: Math.ceil(total/pageSize)
           }
       }
       res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};