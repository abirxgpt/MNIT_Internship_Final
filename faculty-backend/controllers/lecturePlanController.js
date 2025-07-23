import LecturePlan from '../models/lecturePlanModel.js';
import Course from '../models/courseModel.js';

export const getLecturePlanByCourse = async (req, res) => {
    const { courseId } = req.params;
    const { year, session } = req.query;
    try {
        // Check if course exists
        const course = await Course.findOne({ courseId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        // Fetch lecture plan from LecturePlan collection
        const lecturePlanEntry = await LecturePlan.findOne({
            courseId,
            year,
            session
        });
        if (!lecturePlanEntry) {
            return res.status(404).json({ message: 'Lecture plan not found for the given year and session' });
        }
        res.status(200).json(lecturePlanEntry.lecturePlan);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};