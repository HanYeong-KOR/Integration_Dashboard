import React, { useEffect, useState } from 'react';
import ApiDataCard from './ApiDataCard';
import ApiService from '../services/ApiService';

const Dashboard = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        ApiService.fetchApiData()
            .then(response => {
                console.log('response', response);
                
                setApiData(response.data);
            })
            .catch(error => {
                console.error("Error fetching API data:", error);
            });
    }, []);

    return (
        <div>
            <h1 className='dashboard-title'>Dashboard</h1>
            <div className="api-data-container">
                {apiData.map(data => (
                    <ApiDataCard key={data.id} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
