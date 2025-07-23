import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    location: { type: String },
    year: { type: Number },
    purpose: { type: String },
    description: { type: String },
    photoUrl: { type: String },
    coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
    }
});

export default mongoose.model("Trip", tripSchema);
