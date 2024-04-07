import React, { useState } from 'react';
import axios from 'axios';
import { Route, useNavigate } from 'react-router-dom';

function LoginForm() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(''); // Added for error handling

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrorMessage(''); // Clear error message on input change
    };

    const returnToken = () => {
        return localStorage.getItem('token');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = returnToken();

            const apiUrl = 'http://localhost:8080/api/auth/authenticate';
            const response = await axios.post(apiUrl, user, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Include token if available
                },
            });

            e.target.reset(); // Reset form fields on successful login

            console.log(response.data.token);
            const newToken = response.data.token;

            localStorage.setItem('token', newToken);

            const responseUser = await axios.post(apiUrl, user, {
                headers: {
                    'Authorization': 'Bearer ' + token, // Include token if available
                },
            });

            const usersRole = responseUser.data.role;
            localStorage.setItem('role', usersRole);

            // Navigate to appropriate page based on role
            if (usersRole === 'STARTUP') {
                navigate('/startupPage');
            } else if (usersRole === 'INVESTOR') {
                navigate('/investorPage');
            } else {
                // Admin or other role - adapt navigation logic
                navigate('/adminPage');
            }
        } catch (error) {
            console.error('There was an error!', error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">User Login</button>
        </form>
    );
}

export default LoginForm;
