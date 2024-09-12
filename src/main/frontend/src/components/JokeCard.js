import React from 'react';

const JokeCard = ({ data }) => {
    console.log('data', data);
    const date = new Date(data.updated_at);
    const formatDate =  date.toISOString().split('T')[0]; // 날짜만 추출
    
    return (
        <div className="api-data-card">
            <h3>{data.apiName}</h3>
            <p>Response Data: {data.value}</p>
            <p>Fetched At: {formatDate}</p>
        </div>
    );
};

export default JokeCard;
