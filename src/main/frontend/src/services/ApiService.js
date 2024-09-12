import axios from 'axios';

const API_BASE_URL = "http://localhost:9090/api";  // Spring Boot 백엔드 주소

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

// 올바르게 함수 export
export default {
    fetchApiData,
    jokeApiData,
    naverNewsData
};
