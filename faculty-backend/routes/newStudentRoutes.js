import express from 'express';
import {
  registerStudent,
  getPendingStudents,
  approveStudent,
  rejectStudent
} from '../controllers/newStudentController.js';

const router = express.Router();

router.post('/register', registerStudent);
router.get('/pending', getPendingStudents);
router.post('/approve/:id', approveStudent);
router.post('/reject/:id', rejectStudent);

export default router;
