import {auth} from "express-oauth2-jwt-bearer";
import type {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.ts";


declare global{
    namespace Express {
        interface Request {
            auth0Id?: string;
            userId?: string;
        }
    }
}
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE as string,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL as string,
    tokenSigningAlg: 'RS256'
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authorization.split(" ")[1];
    try {
        const decodedToken = jwt.decode(token as string) as jwt.JwtPayload;
        if (!decodedToken || !decodedToken.sub) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const auth0Id = decodedToken?.sub;
        const user = await User.findOne({ auth0Id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid token" });
    }
}
