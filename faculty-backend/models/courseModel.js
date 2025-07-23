import { Schema, model } from 'mongoose';

const yearDetailSchema = new Schema({
  year: { type: String, required: true },
  session: { type: String, required: true },
  syllabusLink: { type: String, trim: true },
  classroomLink: { type: String, trim: true },
}, { _id: false });

const courseSchema = new Schema({
  courseId: { type: String, required: true, unique: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  courseType: { type: String, enum: ['Currently Teaching', 'Previously Taught'], required: true },
  institute: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  yearsTaught: { type: [yearDetailSchema], default: [] }
});

const Course = model('Course', courseSchema);

export default Course;
