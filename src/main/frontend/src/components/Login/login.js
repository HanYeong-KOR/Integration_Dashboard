import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css';
import LOADING from '../../common/loading';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:9090/api/user/login", {
                username: username,
                password: password,
            });
            console.log(response);
            
            if (response.data.error == null) {
                setIsLoading(false);
                navigate('/home');
            } else {
                setIsLoading(false);
                setMessage("Login failed : " + JSON.stringify(response.data.error));
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
            setMessage("An error occurred during login. Please try again.");
        }
    };

    if(isLoading) {
        return (
            <div className="login-container">
                <LOADING />
            </div>
        )
    } else {

        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="loginId">Id:</label>
                        <input
                            type="text"
                            id="loginId"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">로그인</button>
                </form>
                <Link to="/signup">
                    <button className="signup-button">회원가입</button>
                </Link>
                {message && <p className="message">{message}</p>}
            </div>
        );
    }
}

export default Login;
