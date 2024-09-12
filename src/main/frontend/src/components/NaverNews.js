import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function NaverNews() {
    const [searchTerm, setSearchTerm] = useState('');
    const [naverNews, setNaverNews] = useState([]);

    const fetchNews = async () => {
        try {
            const response = await ApiService.naverNewsData(searchTerm);
            console.log(response.data);
            setNaverNews(response.data.items);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const removeHtmlTags = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    };

    const decodeHtml = (text) => {
        if (!text) return text;
        
        const txt = document.createElement('textarea');
        txt.innerHTML = text;
        return txt.value;
    };

    return (
        <div className='news-container'>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search news"
            />
            <button onClick={fetchNews}>Search</button>

            <ul className='news-list'>
                {naverNews.length > 0 ? (
                    naverNews.map((newsItem, index) => (
                        <li key={index} className="news-item">
                            <h3>{decodeHtml(removeHtmlTags(newsItem.title))}</h3>
                            <p>{decodeHtml(removeHtmlTags(newsItem.description))}</p>
                            <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        </li>
                    ))
                ) : (
                    <p>No news found. Try a different search term.</p>
                )}
            </ul>
        </div>
    );
}

export default NaverNews;