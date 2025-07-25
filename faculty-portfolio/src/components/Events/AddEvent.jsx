import { useState } from 'react';
import { toast } from 'react-toastify'
import './AddEvent.css';

function AddEvent() {
    const [formData, setFormData] = useState({
        category: '',
        eventTitle: '',
        eventType: '',
        institute: '',
        city: '',
        country: '',
        participationType: '',
        dateFrom: '',
        dateTo: '',
        designation: '',
        sponsoredBy: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Event added successfully!');
                setFormData({
                    category: '',
                    eventTitle: '',
                    eventType: '',
                    institute: '',
                    city: '',
                    country: '',
                    participationType: '',
                    dateFrom: '',
                    dateTo: '',
                    designation: '',
                    sponsoredBy: '',
                });
            } else {
                const errorData = await response.json();
                if (errorData.message === "Event with this title already exists.") {
                    toast.info("An event with this title already exists!");
                } else {
                    toast.error('Failed to add event.');
                }
            }
        } catch (err) {
            console.error('Submission error:', err);
            toast.error('Error submitting event.');
        }
    };

    return (
        <div className="add-event-wrapper">
            <h2 className="h2Head">Add Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-group">
                        <select className="select" name="category" value={formData.category} onChange={handleChange}>
                            <option value="">--Category of Event--</option>
                            <option value="Short Term Course">Short Term Course</option>
                            <option value="Conference">Conference</option>
                            <option value="Workshop">Workshop</option>
                            <option value="FDP">FDP</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Guest Lecture">Guest Lecture</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="eventTitle"
                            className="input"
                            placeholder="Event Title"
                            value={formData.eventTitle}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <select
                            name="eventType"
                            className="input"
                            value={formData.eventType}
                            onChange={handleChange}
                        >
                            <option value="">--Type of Event--</option>
                            <option value="International">International</option>
                            <option value="National">National</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="designation"
                            className="input"
                            placeholder="Designation for Event"
                            value={formData.designation}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="institute"
                            className="input"
                            placeholder="Institute"
                            value={formData.institute}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="city"
                            className="input"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="country"
                            className="input"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <select
                            name="participationType"
                            className="input"
                            value={formData.participationType}
                            onChange={handleChange}
                        >
                            <option value="">--Participation Type--</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Organized">Organized</option>
                            <option value="Attended">Attended</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-group">
                        <label>Date From</label>
                        <input
                            type="date"
                            name="dateFrom"
                            className="dateE input"
                            value={formData.dateFrom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Date To</label>
                        <input
                            type="date"
                            name="dateTo"
                            className="dateE input"
                            value={formData.dateTo}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="sponsoredBy"
                            className="input"
                            placeholder="Sponsored By"
                            value={formData.sponsoredBy}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="add-event-button">Add Event</button>
            </form>
        </div>
    );
}

export default AddEvent;
