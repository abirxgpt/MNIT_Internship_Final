import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true,
  },
  // Add more fields here if needed (email, dept, etc.)
});

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
