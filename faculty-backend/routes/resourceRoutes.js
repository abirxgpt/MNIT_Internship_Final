import { Router } from 'express';
const router = Router();

import { addResource, getAllResources } from '../controllers/resourceController.js';

// Route to add a new resource
router.post('/add', addResource);

// Route to get all resources
router.get('/all', getAllResources);

// Route to get resources by category (like 'previousPapers', 'videoLinks', etc.)
// router.get('/:category', getResourcesByCategory);

export default router;
