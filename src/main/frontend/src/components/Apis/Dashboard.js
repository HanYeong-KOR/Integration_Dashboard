import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../Loading';
import ApiService from '../../services/ApiService';
import JokeCard from './JokeCard';
import NaverNews from './NaverNews';
import Karlo from './Karlo';

const Dashboard = () => {
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.jokeApiData();
                const jokeData = response.data ? [response.data] : [];
                setApiData(jokeData);
            } catch (error) {
                console.error('API 데이터를 가져오는 중 오류 발생:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="api-data-container">
                <div className='joke-container'>
                    {isLoading  ? (
                        <LoadingSpinner />
                    ) : (
                        apiData.map(data => (
                            <JokeCard key={data.id} data={data} />
                        ))
                    )}
                </div>
                <div className='news'>
                    <NaverNews />
                </div>
            </div>
                <Karlo />
        </div>
    );
};

export default Dashboard;
