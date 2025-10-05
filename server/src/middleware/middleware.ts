import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export interface AuthRequest extends Request {
  userID?: string| JwtPayload;
}

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    const header:any = req.headers["authorization"];


    try {
        const decoded = jwt.verify(header, `${process.env.JWT_PASSWORD}`)
        console.log("token", header, decoded,`${process.env.JWT_PASSWORD}`)
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
        res.json(403).json({ message: err.message })
    }



}