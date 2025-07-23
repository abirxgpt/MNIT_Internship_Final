import Achievement from "../models/achievementModel.js";

// Add Achievement
export const addAchievement = async (req, res) => {
  try {
    const newAchievement = new Achievement(req.body);
    await newAchievement.save();
    res.status(201).json({ message: "Achievement added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add achievement" });
  }
};

// Get All Achievements
export const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
};
