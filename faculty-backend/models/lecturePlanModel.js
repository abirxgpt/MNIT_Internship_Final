import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    lectureNo: String,
    date: String,
    title: String,
    pdfLink: String,
    pptLink: String
});

const lecturePlanSchema = new mongoose.Schema({
    courseId: String,
    year: String, 
    session: String,      // Spring/Fall
    lecturePlan: [lectureSchema]
});

// Enforce uniqueness of courseId + session + year
lecturePlanSchema.index({ courseId: 1, session: 1, year: 1 }, { unique: true });

export default mongoose.model('LecturePlan', lecturePlanSchema);
