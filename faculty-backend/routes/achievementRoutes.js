import express from "express";
import { addAchievement, getAllAchievements } from "../controllers/achievementController.js";

const router = express.Router();

router.post("/add", addAchievement);
router.get("/all", getAllAchievements);

export default router;
