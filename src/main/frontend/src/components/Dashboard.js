import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import JokeCard from './JokeCard';
import NaverNews from './NaverNews';

const Dashboard = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.jokeApiData();
                const jokeData = response.data ? [response.data] : [];
                setApiData(jokeData);
            } catch (error) {
                console.error('API 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="api-data-container">
                {apiData.length > 0 ? (
                    apiData.map(data => (
                        <JokeCard key={data.id} data={data} />
                    ))
                ) : (
                    <p>데이터를 로딩 중입니다...</p>
                )}

                <NaverNews />
            </div>
        </div>
    );
};

export default Dashboard;
