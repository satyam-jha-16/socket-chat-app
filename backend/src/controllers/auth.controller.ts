import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";
import protectRoute from "../middleware/protectRoute.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }

    const isPasswordValid = (password: string) => {
      const numberRegex = /\d/;
      const uppercaseRegex = /[A-Z]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      return (
        numberRegex.test(password) &&
        uppercaseRegex.test(password) &&
        specialCharRegex.test(password)
      );
    };

    if (!isPasswordValid(password)) {
      return res.status(400).json({ msg: "Password must contain at least one uppercase letter, one number and one special character" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password and Confirm Password do not match." });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res.status(400).json({ msg: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newuser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
      }
    });

    if (newuser) {
      generateToken(newuser.id, res);

      return res.status(200).json({
        id: newuser.id,
        fullName: newuser.fullName,
        username: newuser.username,
        profilePic: newuser.profilePic,
      });
    } else {
      return res.status(500).json({ error: "Invalid user data" });
    }

  } catch (err: any) {
    console.log("error in signup", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateToken(user.id, res);

    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    });

  } catch (err) {
    console.log("error in login", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log("error in getMe", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
