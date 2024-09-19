import React, { useState } from 'react';
import LoadingSpinner from '../Loading';
import ApiService from '../../services/ApiService';

function NasaImage() {
    const [isLoading, setIsLoading] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [nasaData, setNasaData] = useState([]);

    const getNasaImage = async () => {
        setIsLoading(true);
        try {
            const response = await ApiService.nasaImageData(searchTerm);
            console.log(response.data.collection);

            const items = response.data.collection.items || [];
            const images = [];
            var num = 0;

            for (let i = 0; i < items.length; i++) {                
                const links = items[i].links || [];
                for (let j = 0; j < links.length; j++) {
                    num++;
                    if(num < 6) {
                        images.push(links[j].href);
                    } else {
                        break;
                    }
                }
            }

            setNasaData(images);
        } catch (error) {
            console.error("Error NASA image:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='karlo-container'>
            <h2>NASA 이미지 검색</h2>
            <div className='btn-container'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search news"
                />
                <button onClick={getNasaImage}>Search</button>
            </div>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    nasaData && (
                        nasaData.map((nasaItem, index) => (
                            <div key={index} className="generated-image">   
                                <img src={nasaItem} alt="NASA" />
                            </div>
                        ))
                    )
                )}
        </div>
    );
}

export default NasaImage;