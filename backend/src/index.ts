import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;

app.get("/test",async (req:Request, res:Response) => {
     return res.json({message: "Hello"});
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
