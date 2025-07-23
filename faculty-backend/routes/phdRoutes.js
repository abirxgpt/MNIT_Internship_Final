import express from 'express';
import { addPhD, getAllPhDs } from '../controllers/phdController.js';

const router = express.Router();

router.post('/add', addPhD);
router.get('/all', getAllPhDs);

export default router;
