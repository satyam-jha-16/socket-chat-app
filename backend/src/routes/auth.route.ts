import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import protectRoute from '../middleware/protectRoute.js';


const router  = express.Router();

router.get("/getme", protectRoute, getMe );

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

export default router;
