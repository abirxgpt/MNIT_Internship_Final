import React, { useEffect, useState } from 'react';
import './Gallery.css';
import Navbar from '../Navbar/Navbar';
import GalleryCard from '../GalleryCards/GalleryCard';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/all`);
                const data = await res.json();
                setImages(data);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            }
        };

        fetchGallery();
    }, []);

    return (
        <>
            <Navbar />
            <div className="gallery-container">
                <h1 className="gallery-heading">Gallery</h1>
                <div className="gallery-grid">
                    {images.map((img) => (
                        <GalleryCard
                            key={img._id}
                            image={img.image}
                            caption={img.caption}
                            date={img.date}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Gallery;
