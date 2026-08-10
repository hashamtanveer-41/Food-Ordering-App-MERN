import "dotenv/config"
import express, {type NextFunction,type Request,type Response} from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.ts";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;

app.get("/health", async (req: Request, res:Response, next:NextFunction)=>{
    res.send({message: "Server is running"});
})
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
