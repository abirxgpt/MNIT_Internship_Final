import User from "../models/User.js";

export async function mylogin(req, res) {
    const userId = req.body.userId;
    const password = req.body.password;
    const role = req.body.role;

    console.log(`Login attempt: userId=${userId}, role=${role}`);

    try {
        const user = await User.findOne({ userId });

        if (!user || user.password !== password || user.role !== role) {
            console.log("Input data is incorrect");
            return res.status(401).json({ message: "Unauthorized" });
        }

        console.log("Login successful");

        res.json({
            userId: user.userId,
            userName: user.userName,
            role: user.role,
            firstLogin: user.firstLogin,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.role !== 'student') {
            return res.status(403).json({ message: "Only students can change password through this route." });
        }

        if (user.password !== oldPassword) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

        user.password = newPassword;
        user.firstLogin = false; // ✅ Mark first login complete
        await user.save();

        return res.status(200).json({ message: "Password changed successfully." });
    } catch (err) {
        return res.status(500).json({ message: "Failed to change password.", error: err.message });
    }
};

