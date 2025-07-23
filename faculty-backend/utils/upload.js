import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'faculty-profile/photos', // optional folder name
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 400, crop: "limit" }] // resize if needed
    },
});

const upload = multer({ storage });
export default upload;
