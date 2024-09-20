import React, { useState } from 'react';
import LoadingSpinner from '../Loading';
import ApiService from '../../services/ApiService';

function Karlo() {
    const [isLoading, setIsLoading] = useState();
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('low quality, low contrast, draft, amateur, cut off, cropped, frame');
    const [generatedImage, setGeneratedImage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const generateImage = async () => {
        setIsLoading(true);
        try {
            const response = await ApiService.karloData({ prompt, negative_prompt: negativePrompt });
            console.log("karlo response", response);
            
            setGeneratedImage(response.data.images[0].image);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        setIsModalOpen(false);
        setIsLoading(true);
        console.log('generatedImage', generatedImage);

        try {
            const response = await ApiService.uploadImageShop({ "title" : title, "imageUrl" : generatedImage, "price" : price, "description" : description });
            console.log("karlo response", response);
        } catch (error) {
            console.error('Error upload image:', error);
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };
    
    return (
        <div className='karlo-container'>
            <h2>AI 이미지 생성기</h2>
            <div className='btn-container'>
                <input
                    type="text"
                    placeholder="Enter prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter negative prompt"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                />
                <button onClick={generateImage}>Generate Image</button>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                generatedImage && (
                    <div className="generated-image">   
                        <h3>Generated Image:</h3>
                        <img src={generatedImage} alt="Generated" />
                        <br />
                        <button onClick={handleModalOpen}>Upload Image</button>
                    </div>
                )
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Upload Image Details</h3>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            Image URL:
                            <input
                                type="url"
                                value={generatedImage}
                                disabled
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Karlo;