// src/Auth.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Added for password confirmation
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setMessage('');
        setUsername(''); // Clear username
        setPassword(''); // Clear password
        setConfirmPassword(''); // Clear confirmPassword
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match when registering
        if (!isLogin && password !== confirmPassword) {
            setMessage('Passwords do not match. Please try again.');
            return;
        }

        const url = isLogin ? 'http://localhost:8080/login' : 'http://localhost:8080/register';
        const userData = { username, password };

        try {
            const response = await axios.post(url, userData, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (isLogin) {
                const token = response.data.token; // Assuming the token is under "token" in the response
                if (token) {
                    localStorage.setItem('token', token); // Store token in localStorage
                    setIsAuthenticated(true); // Update the auth state in App
                    setMessage('Login successful!');
                    navigate('/'); // Redirect to home page
                } else {
                    setMessage('Failed to retrieve token. Please try again.');
                }
            } else {
                setMessage('Registration successful! Please login.');
            }
        } catch (error) {
            setMessage(isLogin ? 'Login failed: ' + error.response?.data?.message : 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <p onClick={handleToggle} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isLogin ? 'Create an account' : 'Already have an account?'}
                </p>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Auth;
