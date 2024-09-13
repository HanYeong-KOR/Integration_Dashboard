import axios from 'axios';

const API_BASE_URL = "http://localhost:9090/api";

const fetchApiData = () => {
    return axios.get(`${API_BASE_URL}/fetch`);
};

const jokeApiData = () => {
    return axios.get(`${API_BASE_URL}/joke`);
};

const naverNewsData = (searchTerm) => {
    console.log(searchTerm);
    
    return axios.post(`${API_BASE_URL}/naverNews`, searchTerm);
};

const karloData = (data) => {
    console.log("karlo data: " + JSON.stringify(data));
    
    return axios.post(`${API_BASE_URL}/karlo`, data);
};

// 올바르게 함수 export
export default {
    fetchApiData,
    jokeApiData,
    naverNewsData,
    karloData
};
