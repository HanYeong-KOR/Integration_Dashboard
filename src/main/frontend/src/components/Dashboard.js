import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import ApiDataCard from './ApiDataCard'; // ApiDataCard 컴포넌트를 가져옵니다.

const Dashboard = () => {
    const [apiData, setApiData] = useState([]); // 초기값을 빈 배열로 설정

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.jokeApiData();
                const jokeData = response.data ? [response.data] : []; // 데이터를 배열 형태로 변환
                setApiData(jokeData);
            } catch (error) {
                console.error('API 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className='dashboard-title'>Dashboard</h1>
            <div className="api-data-container">
                {apiData.length > 0 ? (
                    apiData.map(data => (
                        <ApiDataCard key={data.id} data={data} />
                    ))
                ) : (
                    <p>데이터를 로딩 중입니다...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
