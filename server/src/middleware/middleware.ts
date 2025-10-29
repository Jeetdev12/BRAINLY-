import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export interface AuthRequest extends Request {
    userId?: string ;
}

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Token is not available" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token format is invalid",
            response:token
         });
    }

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_PASSWORD}`)
        console.log("token", token, decoded, `${process.env.JWT_PASSWORD}`)
        if (decoded) {
            console.log((decoded as JwtPayload)._id)
            if (typeof decoded === "string") {
                res.status(403).json({
                    message: "You are not logged in"
                })
                return;
            }
            //@ts-ignore
            req.userId = (decoded as JwtPayload)._id;
            next()
        } else {
            res.status(403).json({
                message: "You are not logged in"
            })
        }
    } catch (err: any) {
        res.status(403).json({ message: err.message })
    }



}