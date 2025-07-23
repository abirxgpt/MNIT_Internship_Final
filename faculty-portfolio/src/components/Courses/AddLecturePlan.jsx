import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import './AddLecturePlan.css';

const AddLecturePlan = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [lecturePlan, setLecturePlan] = useState([
        { lectureNo: '', date: '', title: '', pdfLink: '', pptLink: '' }
    ]);
    const [year, setYear] = useState('');
    const [session, setSession] = useState('');

    useEffect(() => {
        // Fetch courses for dropdown
        const fetchCourses = async () => {
            const response = await fetch('https://faculty-backend-koz0.onrender.com/api/courses/all');
            const data = await response.json();
            setCourses(data);
        };
        fetchCourses();
    }, []);


    const handleLectureChange = (index, field, value) => {
        const updated = [...lecturePlan];
        updated[index][field] = value;
        setLecturePlan(updated);
    };

    const addLecture = () => {
        setLecturePlan([...lecturePlan, { lectureNo: '', date: '', title: '', pdfLink: '', pptLink: '' }]);
    };

    const removeLecture = (index) => {
        const updated = [...lecturePlan];
        updated.splice(index, 1);
        setLecturePlan(updated);
    };

    const handleSubmit = async () => {
        if (!selectedCourseId) {
            toast.warn('Please select a course');
            return;
        }

        if (!year) {
            toast.warn('Please enter year');
            return;
        }

        if (!session) {
            toast.warn('Please enter session');
            return;
        }

        for (const lec of lecturePlan) {
            if (!lec.lectureNo || !lec.date || !lec.title) {
                toast.warn('Please fill all lecture details');
                return;
            }
        }

        try {
            const response = await fetch(`https://faculty-backend-koz0.onrender.com/api/courses/add-lecture-plan/${selectedCourseId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({
                //     // courseId: selectedCourseId,
                //     // year,
                //     // session,
                //     // lecturePlan
                // })
                body: JSON.stringify({
                    // courseId: selectedCourseId,
                    // yearEntry: {
                    //     year,
                    //     session,
                    //     lecturePlan
                    // }
                    year,
                    session,
                    lecturePlan
                })
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Lecture Plan added successfully!');
                setLecturePlan([{ lectureNo: '', date: '', title: '', pdfLink: '', pptLink: '' }]);
                setSelectedCourseId('');
                setYear('');
                setSession('');
            } else {
                if (data.message.includes("already exists")) {
                    toast.info("A lecture plan for this Course + Session + Year already exists.");
                } else {
                    toast.error(data.message || 'Failed to add lecture plan');
                }
            }
        } catch (err) {
            toast.error('Server error');
            console.error(err);
        }
    };

    return (
        <div className="add-lecture-plan-wrapper">
            <h2 className="headingL">Add Lecture Plan</h2>
            <div className="input-groupL">
                <select
                    className="selectL"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                    <option value="">-- Select Course --</option>
                    {courses.map((c, idx) => (
                        <option key={idx} value={c.courseId}>{c.courseName} ({c.courseId})</option>
                    ))}
                </select>
                <input
                    className="inputL smallL yearL"
                    type="text"
                    placeholder="Year (e.g. 2025)"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <select
                    className="selectL"
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                >
                    <option value="">-- Select Session --</option>
                    <option value="Spring">Spring (Jan–May)</option>
                    <option value="Fall">Fall (Aug–Dec)</option>
                </select>

            </div>
            <div className="addLecture">
                <h3 className="h3">Add Lecture</h3>
                {lecturePlan.map((lec, idx) => (
                    <div className="lecture-row" key={idx}>
                        <input
                            className="inputL smallL"
                            type="text"
                            placeholder="Lecture No."
                            value={lec.lectureNo}
                            onChange={(e) => handleLectureChange(idx, 'lectureNo', e.target.value)}
                        />
                        <input
                            className="inputL smallL"
                            type="date"
                            value={lec.date}
                            onChange={(e) => handleLectureChange(idx, 'date', e.target.value)}
                        />
                        <input
                            className="inputL mediumL"
                            type="text"
                            placeholder="Title"
                            value={lec.title}
                            onChange={(e) => handleLectureChange(idx, 'title', e.target.value)}
                        />
                        <input
                            className="inputL"
                            type="text"
                            placeholder="PDF Link"
                            value={lec.pdfLink}
                            onChange={(e) => handleLectureChange(idx, 'pdfLink', e.target.value)}
                        />
                        <input
                            className="inputL"
                            type="text"
                            placeholder="PPT Link"
                            value={lec.pptLink}
                            onChange={(e) => handleLectureChange(idx, 'pptLink', e.target.value)}
                        />
                        {idx > 0 && (
                            <button className="remove-lecture-btnL" onClick={() => removeLecture(idx)}>❌</button>
                        )}
                    </div>
                ))}
            </div>
            <button className="add-buttonL" onClick={addLecture}>+ Add Lecture</button>
            <div className="addBtn">
                <button
                    className="submit-buttonL"
                    onClick={handleSubmit}
                // disabled={!selectedCourseId || !year || !session || lecturePlan.some(l => !l.lectureNo || !l.date || !l.title)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AddLecturePlan;
