import express from 'express';
import {
  updateTabVisibility,
  getVisibleTabs,
  getAllTabs
} from '../controllers/tabVisibilityController.js';

const router = express.Router();

router.put('/update', updateTabVisibility);      // Admin saves visibility
router.get('/enabled-tabs', getVisibleTabs);     // For students: returns { tabs: [...] }
router.get('/all', getAllTabs);                  // For admin: returns full array

export default router;
