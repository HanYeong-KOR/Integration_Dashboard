import React, { useState } from 'react';
import LoadingSpinner from '../Loading';
import ApiService from '../../services/ApiService';

function NaverNews() {
    const [isLoading, setIsLoading] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [naverNews, setNaverNews] = useState([]);

    const fetchNews = async () => {
        setIsLoading(true);
        try {
            const response = await ApiService.naverNewsData(searchTerm);
            console.log(response.data);
            setNaverNews(response.data.items);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setIsLoading(false);
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
            <h2>네이버 뉴스</h2>
            <div className='btn-container'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search news"
                />
                <button onClick={fetchNews}>Search</button>
            </div>

            <div className='list-container'>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <ul className='news-list'>
                        {naverNews && naverNews.length > 0 ? (
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
                            <p>No news found</p>  // 검색 결과가 없을 때 처리
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default NaverNews;