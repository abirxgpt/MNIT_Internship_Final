import { Router } from 'express';
const router = Router();

import { 
  addCourse, 
  getAllCourses, 
  getCourseById, 
  addYearToCourse,
  addLecturePlan
} from '../controllers/courseController.js';
import { getLecturePlanByCourse } from '../controllers/lecturePlanController.js';

router.post('/add', addCourse);
router.get('/all', getAllCourses);
router.get('/:courseId', getCourseById);
router.put('/add-year/:courseId', addYearToCourse);
router.post('/add-lecture-plan/:courseId/', addLecturePlan);
router.get('/get-lecture-plan/:courseId', getLecturePlanByCourse);

export default router;
