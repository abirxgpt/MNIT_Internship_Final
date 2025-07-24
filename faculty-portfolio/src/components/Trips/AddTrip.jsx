import { useState } from 'react';
import { toast } from 'react-toastify'
import './AddTrip.css';

function AddTrip() {
    const [formData, setFormData] = useState({
        location: '',
        year: '',
        purpose: '',
        description: '',
        photoUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ['location', 'year', 'purpose'];

        for (let field of requiredFields) {
            if (!formData[field]) {
                toast.warn("Please fill all the required fields.");
                return;
            }
        }

        try {
            const res = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/trips/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success('Trip added successfully!');
                setFormData({ location: '', year: '', purpose: '', description: '', photoUrl: '' });
            } else {
                toast.error('Failed to add trip.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Server error');
        }
    };

    return (
        <div className="add-trip-wrapper">
            <h2 className="h2Head">Add Trip</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location (e.g., Tokyo, Japan)"
                            className="inputT"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            name="year"
                            placeholder="Year"
                            className="inputT"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="purpose"
                            placeholder="Purpose (e.g., Conference)"
                            className="inputT"
                            value={formData.purpose}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="photoUrl"
                            placeholder="Photo URL (optional)"
                            className="inputT"
                            value={formData.photoUrl}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group full-width">
                        <textarea
                            name="description"
                            placeholder="Description or memory (optional)"
                            className="textareaT"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="add-trip-button">Add Trip</button>
            </form>
        </div>
    );
}

export default AddTrip;
