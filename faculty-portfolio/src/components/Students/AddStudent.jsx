import React, { useState } from 'react';
import { toast } from 'react-toastify'
import './AddStudent.css';

function AddStudent() {
    const [student, setStudent] = useState({
        name: '',
        section: '',
        topic: '',
        yearFrom: '',
        yearTo: '',
        status: '',
        institute: '',
    });

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1950; y--) {
        years.push(y);
    }

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const { name, section, topic, yearFrom, yearTo, status, institute } = student;

        if (!name || !topic || !yearFrom || !section || !status) {
            toast.warn('Please fill in all required fields.');
            return;
        }

        const payload = {
            sName: name,
            sDegree: section,
            sTitle: topic,
            sStatus: status,
            sInstitute: institute,
            sYearFrom: parseInt(yearFrom),
        };

        if (yearTo) {
            payload.sYearTo = parseInt(yearTo);
        }

        try {
            const res = await fetch('https://faculty-backend-koz0.onrender.com/api/students/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            // if (!res.ok) throw new Error('Failed to add student');

            const result = await res.json();

            if (!res.ok) {
                if (result.error && result.error.includes('E11000')) {
                    toast.info('A student with this name already exists!');
                } else {
                    toast.error(`Error: ${result.error}`);
                }
                return;
            }
            toast.success('Student added successfully!');
            setStudent({
                name: '',
                section: '',
                topic: '',
                yearFrom: '',
                yearTo: '',
                status: '',
                institute: '',
            });
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="add-student-wrapper">
            <h2 className="heading">Add Student Supervised</h2>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        className="input"
                        placeholder="Student name"
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        name="topic"
                        value={student.topic}
                        onChange={handleChange}
                        className="input"
                        placeholder="Enter research topic"
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <select
                        name="section"
                        value={student.section}
                        onChange={handleChange}
                        className="select"
                        required
                    >
                        <option value="">--Degree--</option>
                        <option value="PhD">PhD</option>
                        <option value="PG">PG(M.Tech/MS)</option>
                        <option value="UG">UG</option>
                    </select>
                </div>

                <div className="input-group">
                    <select
                        name="status"
                        value={student.status}
                        onChange={handleChange}
                        className="select"
                        required
                    >
                        <option value="">--Status--</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <select
                        name="yearFrom"
                        value={student.yearFrom}
                        onChange={handleChange}
                        className="select"
                        required
                    >
                        <option value="">--Year From--</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <select
                        name="yearTo"
                        value={student.yearTo}
                        onChange={handleChange}
                        className="select"
                    >
                        <option value="">--Year To (optional)--</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        name="institute"
                        value={student.institute}
                        onChange={handleChange}
                        className="input"
                        placeholder="Institute"
                        required
                    />
                </div>
            </div>

            <button type="button" onClick={handleSubmit} className="add-student-button">
                Add Student
            </button>
        </div>
    );
}

export default AddStudent;
