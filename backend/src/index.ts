import "dotenv/config"
import express, {type NextFunction,type Request,type Response} from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.ts";
import orderRoutes from "./routes/orderRoute.ts";
import {v2 as cloudinary} from "cloudinary";
import restaurantRoutes from "./routes/resturantRoutes.ts";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
})

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;

app.get("/health", async (req: Request, res:Response, next:NextFunction)=>{
    res.send({message: "Server is running"});
})
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/order", orderRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
