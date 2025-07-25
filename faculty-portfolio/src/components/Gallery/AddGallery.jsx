import React, { useState } from 'react';
import { toast } from 'react-toastify'
import './AddGallery.css';

const AddGallery = () => {
    const [formData, setFormData] = useState({
        image: '',
        caption: '',
        category: '',
        date: '',
    });
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        toast.info('Uploading image...');

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'facultyGalleryUpload');


        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dr5imgpgf/image/upload', {
                method: 'POST',
                body: data,
            });

            const cloudData = await res.json();
            setFormData((prev) => ({ ...prev, image: cloudData.secure_url }));
            console.log("Uploaded Image URL:", cloudData.secure_url);
            toast.dismiss('uploading');
            toast.success('Image uploaded successfully!');
            setUploading(false);
        } catch (err) {
            console.error('Upload error:', err);
            toast.dismiss('uploading');
            toast.error('Failed to upload image.');
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        const { image, caption, category, date } = formData;

        if (!image || !date) {
            toast.warn('Image and Date are required');
            return;
        }
        console.log("Submitting:", { image, caption, category, date });
        try {
            // const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/add`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ image, caption, category, date }),
            // });

            const res = await fetch('http://localhost:8083/api/gallery/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image, caption, category, date }),
            });

            if (!res.ok) throw new Error('Upload failed');
            toast.success('Gallery item added!');
            setFormData({ image: '', caption: '', category: '', date: '' });
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    };

    return (
        <div className="add-gallery-wrapper">
            <h2 className="gallery-head">Add Gallery</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="gallery-form-row">
                    <div className="gallery-input-group">
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        {uploading && <p>Uploading...</p>}
                    </div>
                    <div className="gallery-input-group">
                        <input placeholder="Caption" type="text" name="caption" value={formData.caption} onChange={handleChange} />
                    </div>
                </div>

                <div className="gallery-form-row">
                    <div className="gallery-input-group">
                        <input placeholder="Category" type="text" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                    <div className="gallery-input-group">
                        <input type="date" name="date" className="date" value={formData.date} onChange={handleChange} />
                    </div>
                </div>

                <button className="gallery-submit-button" onClick={handleSubmit}>Add to Gallery</button>
            </form>
        </div>
    );
};

export default AddGallery;
