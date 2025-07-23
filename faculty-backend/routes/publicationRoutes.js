import express from "express";
import { addPublication, getAllPublications } from "../controllers/publicationController.js";

const router = express.Router();

router.post("/add", addPublication);
router.get("/all", getAllPublications);

export default router;
