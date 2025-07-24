import React, { useState } from 'react';
import { toast } from 'react-toastify'
import './AddAchievement.css';

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

const AddAchievement = () => {
    const [aType, setAType] = useState('');
    const [formData, setFormData] = useState({
        type: '',
        // Common
        description: '',
        year: '',
        // For Patents
        title: '',
        authors: '',
        regNo: '',
        grantedBy: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        const payload = {
            ...formData,
            type: aType, // override formData.type for safety
        };

        try {
            const res = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/achievements/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success('Achievement added successfully!');
                setFormData({
                    type: '',
                    description: '',
                    year: '',
                    title: '',
                    authors: '',
                    regNo: '',
                    grantedBy: '',
                    date: '',
                });
                setAType('');
            } else {
                toast.error('Failed to add achievement');
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred');
        }
    };

    return (
        <div className="add-achievement-wrapper">
            <h2 className="heading">Add New Achievement</h2>

            <div className="row">
                <div className="input-groupA">
                    <select value={aType} onChange={(e) => setAType(e.target.value)}>
                        <option value="">--Select Type--</option>
                        <option value="Award">Award / Honour</option>
                        <option value="Patent">Patent</option>
                        <option value="Affiliation">Professional Affiliation</option>
                    </select>
                </div>
            </div>

            {/* Award */}
            {aType === 'Award' && (
                <>
                    <div className="row">
                        <div className="input-groupA">
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-groupA">
                            <select name="year" value={formData.year} onChange={handleChange}>
                                <option value="">--Year--</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </>
            )}

            {/* Patent */}
            {aType === 'Patent' && (
                <>
                    <div className="row">
                        <div className="input-groupA">
                            <input
                                name="title"
                                type="text"
                                placeholder="Patent Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-groupA">
                            <input
                                name="authors"
                                type="text"
                                placeholder="Authors (comma separated)"
                                value={formData.authors}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-groupA">
                            <input
                                name="regNo"
                                type="text"
                                placeholder="Registration Number"
                                value={formData.regNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-groupA">
                            <input
                                name="grantedBy"
                                type="text"
                                placeholder="Granted By"
                                value={formData.grantedBy}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-groupA">
                            <label>Date</label>
                            <input
                                className="date-font"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Affiliation */}
            {aType === 'Affiliation' && (
                <div className="row">
                    <div className="input-groupA">
                        <input
                            name="description"
                            type="text"
                            placeholder="Affiliation Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}

            {aType && (
                <div className="row">
                    <div className="input-groupA">
                        <button className="add-achievement-button" onClick={handleAdd}>
                            Add Achievement
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAchievement;
