import React, { useState } from 'react';
import './AddPhDSupervised.css';

const AddPhDSupervised = () => {
    const [formData, setFormData] = useState({
        researchTopicTitle: '',
        scholarId: '',
        scholarName: '',
        phdStatus: '',
        year: '',
        coSupervisor: '',
        currentDesignation: '',
        organization: '',
        currentEmail: '',
        currentMobile: ''
    });

    const [message, setMessage] = useState('');
    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/phd/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            console.log(formData)
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Something went wrong');

            // setMessage('PhD supervision entry added successfully ✅');
            alert('PhD supervision entry added successfully ');
            setFormData({
                researchTopicTitle: '',
                scholarId: '',
                scholarName: '',
                phdStatus: '',
                year: '',
                coSupervisor: '',
                currentDesignation: '',
                organization: '',
                currentEmail: '',
                currentMobile: ''
            });
        } catch (error) {
            setMessage('❌ Error: ' + error.message);
        }
    };

    return (
        <div className="add-phd-wrapper">
            <h2 className="h2Head">Add PhD Supervision</h2>
            <form className="phd-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-group full-width">
                        {/* <label>Research Topic Title</label> */}
                        <input
                            placeholder="Research Topic Title"
                            name="researchTopicTitle"
                            value={formData.researchTopicTitle}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        {/* <label>Scholar ID</label> */}
                        <input
                            placeholder="Scholar ID"
                            type="text"
                            name="scholarId"
                            value={formData.scholarId}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>
                    <div className="input-group">
                        {/* <label>Scholar Name</label> */}
                        <input
                            placeholder="Scholar Name"
                            type="text"
                            name="scholarName"
                            value={formData.scholarName}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        {/* <label>Status*</label> */}
                        <select
                            name="phdStatus"
                            value={formData.phdStatus}
                            onChange={handleChange}
                            required
                            className="input"
                        >
                            <option value="">--Status--</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="input-group">
                        {/* <label>Year</label> */}
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className="input"
                        >
                            <option value="">--Year--</option>
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        {/* <label>Co-Supervisor</label> */}
                        <input
                            placeholder="Co-Supervisor Detail"
                            type="text"
                            name="coSupervisor"
                            value={formData.coSupervisor}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <div className="input-group">
                        {/* <label>Current Designation</label> */}
                        <input
                            placeholder="Current Designation (Scholar)"
                            type="text"
                            name="currentDesignation"
                            value={formData.currentDesignation}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        {/* <label>Organization</label> */}
                        <input
                            placeholder="Organization (Scholar)"
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <div className="input-group">
                        {/* <label>Current Mobile No.</label> */}
                        <input
                            placeholder="Current Mobile No. (Scholar)"
                            type="text"
                            name="currentMobile"
                            value={formData.currentMobile}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        {/* <label>Current Email</label> */}
                        <input
                            placeholder="Current Email (Scholar)"
                            type="email"
                            name="currentEmail"
                            value={formData.currentEmail}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                </div>

                <button type="submit" className="add-phd-button">Add PhD Entry</button>
            </form>
            {/* {message && <p className="phdStatus-message">{message}</p>} */}
        </div>
    );
};

export default AddPhDSupervised;
