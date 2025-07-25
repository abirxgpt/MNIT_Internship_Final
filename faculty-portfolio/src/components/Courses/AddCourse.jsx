import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import './AddCourse.css';

function AddCourse() {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');
    const [institute, setInstitute] = useState('');
    const [description, setDescription] = useState('');
    const [yearsTaught, setYearsTaught] = useState([
        { year: '', session: '', syllabusLink: '', classroomLink: '' }
    ]);
    const [lecturePlan, setLecturePlan] = useState([
        { lectureNo: '', date: '', title: '', pdfLink: '', pptLink: '' }
    ]);

    const handleYearChange = (index, field, value) => {
        const updatedYears = [...yearsTaught];
        updatedYears[index][field] = value;
        setYearsTaught(updatedYears);
    };

    const addYearField = () => {
        setYearsTaught([
            ...yearsTaught,
            { year: '', session: '', syllabusLink: '', classroomLink: '' }
        ]);
    };

    const removeYearField = (index) => {
        const updatedYears = [...yearsTaught];
        updatedYears.splice(index, 1);
        setYearsTaught(updatedYears);
    };

    const updateLecture = (index, field, value) => {
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

    const addYearSession = () => {
        setYearsTaught([...yearsTaught, { year: '', session: '' }]);
    };

    const handleYearSessionChange = (index, field, value) => {
        const updated = [...yearsTaught];
        updated[index][field] = value;
        setYearsTaught(updated);
    };


    const handleAdd = async () => {
        if (!courseId || !courseName || !courseType || !institute || !description) {
            toast.warn('Please fill all course fields.', { toastId: 'empty-course-fields' });
            return;
        }

        for (const yearEntry of yearsTaught) {
            // if (!yearEntry.year || !yearEntry.session || !yearEntry.syllabusLink || !yearEntry.classroomLink) {
            //     alert('Please fill all year-wise fields.');
            //     return;
            // }
            if (!yearEntry.year || !yearEntry.session) {
                toast.warn('Please fill all year-wise fields.');
                return;
            }
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/courses/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId,
                    courseName,
                    courseType,
                    institute,
                    description,
                    yearsTaught,
                    // lecturePlan,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Course added successfully!');
                // Clear form
                setCourseId('');
                setCourseName('');
                setCourseType('');
                setInstitute('');
                setDescription('');
                setYearsTaught([{ year: '', session: '', syllabusLink: '', classroomLink: '' }]);
            } else {
                toast.error(data.message || 'Something went wrong.');
            }
        } catch (err) {
            toast.error('Error connecting to server.');
            console.error(err);
        }
    };

    return (
        <div className="add-course-wrapper">
            <h2 className="heading">Add New Course</h2>

            <div className="row">
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Course ID"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <select
                        className='select'
                        value={courseType}
                        onChange={(e) => setCourseType(e.target.value)}
                    >
                        <option value="">--Select-Course-Type--</option>
                        <option value="Currently Teaching">Currently Teaching</option>
                        <option value="Previously Taught">Previously Taught</option>
                    </select>
                </div>
                <div className="input-group">
                    <input
                        className='input'
                        type="text"
                        placeholder="Institute"
                        value={institute}
                        onChange={(e) => setInstitute(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-group full-width">
                    <textarea
                        className="textarea"
                        placeholder="Course Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                </div>
            </div>

            <div className="years-taught-wrapper">
                <h3>Year-wise Course Details</h3>
                {yearsTaught.map((entry, index) => (
                    <div className="year-block" key={index}>
                        <div className="year-row">
                            <input
                                className="inputN small"
                                type="text"
                                placeholder="Year (e.g. 2025)"
                                value={entry.year}
                                onChange={(e) => handleYearChange(index, 'year', e.target.value)}
                            />
                            <select
                                className="select small"
                                value={entry.session}
                                onChange={(e) => handleYearChange(index, 'session', e.target.value)}
                            >
                                <option value="">Select Session</option>
                                <option value="Spring">Spring</option>
                                <option value="Fall">Fall</option>
                            </select>
                        </div>
                        <div className="year-row">
                            <input
                                className="inputN small"
                                type="text"
                                placeholder="Syllabus Link"
                                value={entry.syllabusLink}
                                onChange={(e) => handleYearChange(index, 'syllabusLink', e.target.value)}
                            />
                            <input
                                className="inputN small"
                                type="text"
                                placeholder="Classroom Link"
                                value={entry.classroomLink}
                                onChange={(e) => handleYearChange(index, 'classroomLink', e.target.value)}
                            />
                        </div>
                        {index > 0 && (
                            <button className="remove-button" onClick={() => removeYearField(index)}>
                                ❌
                            </button>
                        )}
                    </div>
                ))}
                <button className="add-year-button" onClick={addYearField}>
                    <FaPlus className="plusIcon" /> Add Another Year
                </button>
            </div>

            <div className="row">
                <button className="add-course-button" onClick={handleAdd}>
                    Add Course
                </button>
            </div>
        </div>
    );
}

export default AddCourse;
