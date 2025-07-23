import Faculty from '../models/facultyModel.js';

export const getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find({}, 'name');
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching faculty list' });
  }
};
