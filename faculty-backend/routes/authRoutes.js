import express from "express";
// import { login } from "../controllers/authController";
const router = express.Router();
import User from "../models/User.js";
import { changePassword } from "../controllers/authController.js";


// router.post("/login", login);

router.post("/change-password", changePassword);
router.post("/login", async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    const role = req.body.role;
    
    try {
        const user = await User.findOne({ userId });

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "User not found" });
        }

        if (user.password !== password) {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Invalid password" });
        }

        if (user.role !== role) {
            console.log("Role mismatch");
            return res.status(401).json({ message: "Invalid role" });
        }

        console.log("Login successful", user.userName);

        res.status(200).json({
            userId: user.userId,
            userName: user.userName,
            role: user.role,
            firstLogin: user.firstLogin,
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
