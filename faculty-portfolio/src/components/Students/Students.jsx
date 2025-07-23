import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Dropdown from "../Dropdown/Dropdown";
import "./Students.css";

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch("https://faculty-backend-koz0.onrender.com/api/students/all");
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setStudents(data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchStudents();
    }, []);

    const degrees = ["PhD", "PG", "UG"];
    const statuses = ["Ongoing", "Completed"];

    const groupedData = degrees.map((degree) => {
        return {
            degree,
            statuses: statuses.map((status) => ({
                status,
                students: students
                    .filter((s) => s.sDegree === degree && s.sStatus === status)
                    .sort((a, b) => (b.sYearFrom || 0) - (a.sYearFrom || 0)),
            })),
        };
    });

    return (
        <>
            <Navbar />
            <div className="students-container">
                <h2 className="students-title">Students Supervised</h2>

                {groupedData.map(({ degree, statuses }) => (
                    <Dropdown key={degree} title={degree} className={`dropdown-${degree.toLowerCase()}`}>
                        {statuses.map(({ status, students }) => (
                            <Dropdown key={status} title={status} className={`dropdown-${status.toLowerCase()}`}>
                                {students.length > 0 ? (
                                    <ul className="ul student-list">
                                        {students.map((student, idx) => (
                                            <li
                                                key={idx}
                                                className={`student-item ${student.sStatus.trim().toLowerCase() === "ongoing" ? "ongoing" : "completed"
                                                    }`}
                                            >
                                                <strong>{student.sName}</strong> — {student.sTitle} (
                                                {student.sYearFrom}
                                                {student.sYearTo ? ` - ${student.sYearTo}` : ''}
                                                )
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-students">No students found</p>
                                )}
                            </Dropdown>
                        ))}
                    </Dropdown>
                ))}
            </div>
        </>
    );
};

export default Students;
