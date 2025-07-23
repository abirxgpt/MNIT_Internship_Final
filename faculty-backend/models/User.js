import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: false },
    role: { type: String, enum: ["student", "admin"], required: true },
    firstLogin: { type: Boolean, default: true }
});

export default model("User", userSchema);