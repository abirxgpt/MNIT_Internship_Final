import { Schema, model } from "mongoose";

const tabVisibilitySchema = new Schema({
  fieldName: { type: String, required: true, unique: true, lowercase: true },
  enabled: { type: Boolean, required: true }
});

export default model("TabVisibility", tabVisibilitySchema);
