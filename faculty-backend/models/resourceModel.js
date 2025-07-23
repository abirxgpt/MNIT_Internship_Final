import { Schema, model } from "mongoose";

const resourceSchema = new Schema({
  title: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Previous Year Papers', 'Important Questions', 'Video Links', 'Notes'], required: true },
});

const Resource = model('Resource', resourceSchema);

export default Resource;
