import jwt from "jsonwebtoken";
import { Response } from "express";


const generateToken = (id: string, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite : "strict",
    secure : process.env.NODE_ENV !== "development"
  });

  return token;
}

export default generateToken;