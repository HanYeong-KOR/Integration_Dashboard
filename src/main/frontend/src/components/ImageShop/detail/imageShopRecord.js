import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './imageShopRecord.css';

function ImageShopRecord() {
    const location = useLocation();
    const imageShopData = location.state?.imageShopData || {};
    const navigate = useNavigate();

    return (
        <div className="imageShop-details-container">
            <h2 className="imageShop-details-title">ImageShop Details</h2>
            <div className="imageShop-details-content">
                <div className="imageShop-details-item">
                    <span className="imageShop-details-label">Title:</span>
                    <span className="imageShop-details-value">{imageShopData.title}</span>
                </div>
                <div className="imageShop-details-item">
                    <span className="imageShop-details-label">Type:</span>
                    <span className="imageShop-details-value">Image</span>
                </div>
                <div className="imageShop-details-item">
                    <span className="imageShop-details-label">Image:</span>
                    <img src={imageShopData.imageUrl} alt="imageUrl" />
                </div>
                <div className="imageShop-details-item">
                    <span className="imageShop-details-label">Price:</span>
                    <span className="imageShop-details-value">{imageShopData.price}</span>
                </div>
                <div className="imageShop-details-item">
                    <span className="imageShop-details-label">Description:</span>
                    <span className="imageShop-details-value">{imageShopData.description}</span>
                </div>
                <div className="imageShop-details-item">
                    <span className="imageShop-details-label">Created Date:</span>
                    <span className="imageShop-details-value">{imageShopData.createdDate}</span>
                </div>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>Back to ImageShop</button>
        </div>
    );
}

export default ImageShopRecord;