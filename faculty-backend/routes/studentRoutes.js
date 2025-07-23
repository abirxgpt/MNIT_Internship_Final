import express from "express";
import { addStudent, getAllStudents } from "../controllers/studentController.js";

const router = express.Router();

// Add a student
router.post("/add", addStudent);

// Get all students
router.get("/all", getAllStudents);

export default router;
