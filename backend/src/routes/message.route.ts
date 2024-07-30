import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getConversations, getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

/* router.get("/conversations", (req, res) => {
  res.send("conversations route ");
}) */

router.get("/getconversations", protectRoute, getConversations);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);
export default router;
