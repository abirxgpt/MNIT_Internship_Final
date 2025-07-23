import express from 'express';
import { getAllFaculty } from '../controllers/facultyController.js';

const router = express.Router();

router.get('/all', getAllFaculty);

export default router;
