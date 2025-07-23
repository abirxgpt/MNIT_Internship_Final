import { Router } from 'express';
const router = Router();
import { addProject, getAllProjects } from '../controllers/projectController.js';

// Add a new project
router.post('/add', addProject);

// Get all projects
router.get('/all', getAllProjects);

export default router;
