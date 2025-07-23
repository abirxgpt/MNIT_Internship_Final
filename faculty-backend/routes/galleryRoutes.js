import express from 'express';
import {
  addGalleryItem,
  getAllGalleryItems,
} from '../controllers/galleryController.js';

const router = express.Router();

// Route to add a new gallery item
router.post('/add', addGalleryItem);

// Route to get all gallery items
router.get('/all', getAllGalleryItems);

// Route to delete a gallery item by ID (optional)
// router.delete('/:id', deleteGalleryItem);

export default router;
