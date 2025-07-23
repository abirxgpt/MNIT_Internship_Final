import mongoose from 'mongoose';

const newStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: String },
  department: { type: String },
  requestedAt: { type: Date, default: Date.now }
});

export default mongoose.model('NewStudent', newStudentSchema);
