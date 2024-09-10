import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './signup.css';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:9090/api/user/signup", {
                username: username,
                password: password,
                nickname: nickname
            });

            console.log(response);
            
            if (response.data.error == null) {
                setMessage("Signup successful! Please log in.");
            } else {
                setMessage("Signup failed : " + JSON.stringify(response.data.error));
            }
        } catch (error) {
            console.error("There was an error during signup!", error);
            setMessage("An error occurred during signup. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Login Id:</label>
                    <input
                        type="text"
                        id="username"
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
                <div className="form-group">
                    <label htmlFor="nickname">Nickname:</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">회원가입</button>
            </form>
            <Link to="/login">
                <button className="signup-button">로그인으로 돌아가기</button>
            </Link>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default Signup;
