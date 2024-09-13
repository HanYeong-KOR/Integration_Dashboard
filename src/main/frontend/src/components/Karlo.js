import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function Karlo() {
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('low quality, low contrast, draft, amateur, cut off, cropped, frame');
    const [generatedImage, setGeneratedImage] = useState('');

    const generateImage = async () => {
        try {
            const response = await ApiService.karloData({ prompt, negative_prompt: negativePrompt });
            console.log("karlo response", response);
            
            setGeneratedImage(response.data.images[0].image);  // Assuming the API response contains an image URL
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };
    
    return (
        <div className="image-generation">
            <div className="form-group">
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

            {generatedImage && (
                <div className="generated-image">   
                    <h3>Generated Image:</h3>
                    <img src={generatedImage} alt="Generated" />
                </div>
            )}
        </div>
    );
}

export default Karlo;