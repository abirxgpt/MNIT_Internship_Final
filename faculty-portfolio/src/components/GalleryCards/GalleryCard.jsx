import React from 'react';
import './GalleryCard.css';
import { FaHeart, FaRegComment, FaRegBookmark } from 'react-icons/fa';
// import { LiaTelegramPlane } from 'react-icons/lia';
import { FaTelegramPlane } from 'react-icons/fa';

const GalleryCard = ({ image, caption, date }) => {
    return (
        <div className="gallery-card">
            <img className="gallery-image" src={image} alt={caption || 'Gallery'} />
            <div className="gallery-card-icons">
                <div className="icons-left">
                    <FaHeart className="heart-icon"/>
                    <FaRegComment />
                    <FaTelegramPlane />
                </div>
                <div className="icon-right">
                    <FaRegBookmark />
                </div>
            </div>
            <div className="gallery-card-footer">
                <span className="caption">{caption}</span>
                <span className="dateG">{new Date(date).toLocaleDateString('en-IN')}</span>
            </div>
        </div>
    );
};

export default GalleryCard;
