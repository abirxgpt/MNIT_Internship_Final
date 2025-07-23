import { Router } from 'express';
import { getProfile, updateProfile, uploadProfilePhoto, uploadCV } from '../controllers/adminController.js';
import upload from '../utils/upload.js'; // ✅ Cloudinary-powered multer

const router = Router();

router.get('/profile', getProfile);
router.put('/profile/update', updateProfile);
router.post('/profile/photo', upload.single('photo'), uploadProfilePhoto);
router.post('/upload-cv', upload.single('cv'), uploadCV); // This still uses local multer or Firebase

export default router;
