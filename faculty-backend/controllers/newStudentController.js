import NewStudent from '../models/newStudentModel.js';
import User from '../models/User.js';
import { sendStudentCredentials } from '../utils/sendEmail.js';

// Register New Student (pending approval)
export const registerStudent = async (req, res) => {
    const { name, rollNumber, email, phone, department } = req.body;

    try {
        const existing = await NewStudent.findOne({ rollNumber });
        if (existing) {
            return res.status(400).json({ message: 'Request already submitted.' });
        }

        const student = new NewStudent({ name, rollNumber, email, phone, department });
        await student.save();
        res.status(201).json({ message: 'Registration request submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit request.', error: error.message });
    }
};

export const getPendingStudents = async (req, res) => {
    try {
        const pending = await NewStudent.find();
        res.status(200).json(pending);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch pending students.", error: err.message });
    }
};

export const approveStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await NewStudent.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found." });

        const existingUser = await User.findOne({ userId: student.rollNumber });
        if (existingUser) {
            return res.status(400).json({
                message: "A user with this roll number already exists."
            });
        }

        const generatedPassword = Math.random().toString(36).slice(-8);

        let newUser;

        try {
            newUser = new User({
                userId: student.rollNumber,
                userName: student.name,
                email: student.email,
                role: "student",
                password: generatedPassword, // ideally hash this later
            });

            await newUser.save();
        } catch (err) {
            return res.status(400).json({
                message: "User creation failed.",
                error: err.message,
            });
        }

        // ✅ Send email to the student
        try {
            await sendStudentCredentials(newUser.email, newUser.userId, generatedPassword);
        } catch (emailErr) {
            console.error("Email sending failed:", emailErr.message);
            // Optional: you could delete the user if email fails
        }

        await NewStudent.findByIdAndDelete(studentId);

        res.status(201).json({
            message: "Student approved and account created.",
            userId: newUser.userId,
            userName: newUser.userName,
            password: generatedPassword,
            emailSent: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Approval failed.",
            error: err.message,
        });
    }
};


export const rejectStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await NewStudent.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found." });

        await NewStudent.findByIdAndDelete(studentId);
        res.status(200).json({ message: "Student request rejected and removed." });
    } catch (err) {
        res.status(500).json({ message: "Rejection failed.", error: err.message });
    }
};
