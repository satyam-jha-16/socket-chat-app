import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";
import express from 'express';

interface DecodedToken  extends JwtPayload{
userId : string
}
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
            };
        }
    }
}
const protectRoute =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ error: "You need to login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded){
            return res.status(401).json({ error: "Invalid Token recieved" });
        }
        const user = await prisma.user.findUnique({
			where: { id: decoded.id },
			select: { id: true, username: true, fullName: true, profilePic: true },
		});


        if (!user){
            return res.status(400).json({ error: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("error in middleware protectRoute", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default protectRoute;