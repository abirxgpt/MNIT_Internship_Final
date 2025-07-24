import React, { useState } from 'react';
import { toast } from 'react-toastify'
import './AddResource.css';

function AddResource() {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');

    const handleAdd = async () => {
        if (!title || !link || !category) {
            toast.warn('Please fill all fields.');
            return;
        }

        try {
            const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/resources/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, link, category }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Resource added successfully!');
                setTitle('');
                setLink('');
                setCategory('');
            } else {
                toast.error(data.message || 'Something went wrong.');
            }
        } catch (err) {
            toast.error('Error connecting to server.');
            console.error(err);
        }
    };

    return (
        <div className="add-resource-wrapper">
            <h2 className="heading">Add Resource</h2>

            <div className="row">
                <div className="input-group">
                    <input
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <select
                        className="select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">--Select Category--</option>
                        <option value="Previous Year Papers">Previous Year Papers</option>
                        <option value="Important Questions">Important Questions</option>
                        <option value="Video Links">Video Links</option>
                        <option value="Notes">Notes</option>
                    </select>
                </div>

            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        className="input"
                        type="text"
                        placeholder="Google Drive Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <button className="add-resource-button" onClick={handleAdd}>
                        Add Resource
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddResource;
