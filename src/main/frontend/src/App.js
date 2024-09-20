import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Apis/Dashboard';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Home from './components/Home/home';
import ImageShop from './components/ImageShop/imageShop';
import './App.css';

function App() {
    const location = useLocation();
    
    // 로그인 및 회원가입 페이지에 Navbar와 Dashboard가 표시되지 않도록 설정
    const hideNavbarAndDashboard = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="App">
            {!hideNavbarAndDashboard && <Navbar />}
            {!hideNavbarAndDashboard && <Dashboard />}
            
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/imageShop" element={<ImageShop />} />
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
