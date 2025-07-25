import express, { json } from "express";
import path from 'path';
import mongoose from "mongoose";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import publicationRoutes from "./routes/publicationRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import projectRoutes from './routes/projectRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import resourceRoutes from "./routes/resourceRoutes.js";
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from "./routes/studentRoutes.js";
import galleryRoutes from './routes/galleryRoutes.js';
import tripRoutes from "./routes/tripRoutes.js";
import tabVisibilityRoutes from './routes/tabVisibilityRoutes.js';
import achievementRoutes from "./routes/achievementRoutes.js";
import newStudentRoutes from './routes/newStudentRoutes.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://mnit-internship-final-8fao.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("/", cors(corsOptions));

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "https://mnit-internship-final-8fao.vercel.app"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,HEAD,PATCH");
  next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/projects", projectRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/resources", resourceRoutes);
app.use('/api', adminRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use("/api/students", studentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use("/api/trips", tripRoutes);
app.use('/api/tab-visibility', tabVisibilityRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/newstudents", newStudentRoutes);

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected to database: ${mongoose.connection.name}`);
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((req, res) => {
  console.log(`Unmatched request: ${req.method} ${req.url}`);
  res.status(404).send("Not Found");
});