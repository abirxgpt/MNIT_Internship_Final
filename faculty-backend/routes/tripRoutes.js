import express from "express";
import { addTrip, getAllTrips } from "../controllers/tripController.js";

const router = express.Router();

router.post("/add", addTrip);
router.get("/all", getAllTrips);

export default router;
