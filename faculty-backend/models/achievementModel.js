import { Schema, model } from "mongoose";

const achievementSchema = new Schema({
  type: { type: String, enum: ["Award", "Patent", "Affiliation"], required: true, },
  // Common
  description: String,
  year: String,
  // For Patent
  title: String,
  authors: String,
  regNo: String,
  grantedBy: String,
  date: String,
}, { timestamps: true });

const Achievement = model("Achievement", achievementSchema);
export default Achievement;
