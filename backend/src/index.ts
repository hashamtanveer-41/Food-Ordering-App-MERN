import "dotenv/config"
import express, {type NextFunction,type Request,type Response} from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.ts";
import orderRoutes from "./routes/orderRoute.ts";
import {v2 as cloudinary} from "cloudinary";
import restaurantRoutes from "./routes/resturantRoutes.ts";
import {fileURLToPath} from "url";

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
app.use(cors());
const PORT = 8000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/order/checkout/webhook", express.raw({type: "*/*"}));

app.use(express.json());

app.get("/health", async (req: Request, res:Response, next:NextFunction)=>{
    res.send({message: "Server is running"});
})
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/order", orderRoutes);

const frontendPath = path.join(__dirname, '../../frontend/dist');

app.use(express.static(frontendPath));

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});
app.use((err: any, req: Request, res:Response, next:NextFunction)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
} )
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
