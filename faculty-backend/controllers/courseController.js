import Course from "../models/courseModel.js";
import LecturePlan from "../models/lecturePlanModel.js";

export const addCourse = async (req, res) => {
  const { courseId, courseName, courseType, institute, description, yearsTaught } = req.body;

  try {
    // Check if course already exists
    let course = await Course.findOne({ courseId });

    if (course) {
      // Prevent duplicate year+session
      for (const newYearEntry of yearsTaught) {
        const duplicate = course.yearsTaught.find(
          (existing) => existing.year === newYearEntry.year && existing.session === newYearEntry.session
        );

        if (duplicate) {
          return res.status(400).json({ message: `Course with year ${newYearEntry.year} and session ${newYearEntry.session} already exists.` });
        }
      }

      // If not duplicate, add new years
      course.yearsTaught.push(...yearsTaught);
      await course.save();
      return res.status(200).json({ message: 'Year-session added to existing course.' });
    }

    // If course doesn't exist, create it
    const newCourse = new Course({
      courseId,
      courseName,
      courseType,
      institute,
      description,
      yearsTaught
    });

    await newCourse.save();
    res.status(200).json({ message: 'Course added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding course.' });
  }
};


export const addLecturePlan = async (req, res) => {
  const { courseId } = req.params;
  const { year, session, lecturePlan } = req.body;

  if (!year || !session || !lecturePlan) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    // Check if lecture plan already exists for course + year + session
    const existingPlan = await LecturePlan.findOne({
      courseId,
      year,
      session
    });

    if (existingPlan) {
      existingPlan.lecturePlan.push(...lecturePlan);
      await existingPlan.save();
      return res.status(200).json({ message: "Lecture plan updated successfully!" });
    }

    // Create new lecture plan document
    const newPlan = new LecturePlan({
      courseId,
      year,
      session,
      lecturePlan
    });

    await newPlan.save();
    res.status(201).json({ message: "Lecture plan added successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Lecture plan for this course, session, and year already exists."
      });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const addYearToCourse = async (req, res) => {
  const { courseId } = req.params;
  const { year, session } = req.body;

  try {
    const course = await Course.findOne({ courseId });

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check for duplicates
    const alreadyExists = course.yearsTaught.some(
      (entry) => entry.year === year && entry.session === session
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Year and session already exist for this course." });
    }

    // Push new year+session
    course.yearsTaught.push({ year, session });
    await course.save();

    res.status(200).json({ message: "Year added successfully", updatedCourse: course });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course", error: err.message });
  }
};
