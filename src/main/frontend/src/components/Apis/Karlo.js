import React, { useState } from 'react';
import LoadingSpinner from '../Loading';
import ApiService from '../../services/ApiService';

function Karlo() {
    const [isLoading, setIsLoading] = useState();
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('low quality, low contrast, draft, amateur, cut off, cropped, frame');
    const [generatedImage, setGeneratedImage] = useState('');

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
                    </div>
                )
            )}
        </div>
    );
}

export default Karlo;