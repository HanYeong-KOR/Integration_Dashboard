import React from 'react';

const ApiDataCard = ({ data }) => {
    console.log('data', data);
    
    return (
        <div className="api-data-card">
            <h3>{data.apiName}</h3>
            <p>Response Data: {data.responseData}</p>
            <p>Fetched At: {data.fetchedAt}</p>
        </div>
    );
};

export default ApiDataCard;
