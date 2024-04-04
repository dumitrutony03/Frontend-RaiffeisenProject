// Login.js

import React, {useState} from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file
import {useNavigate} from "react-router-dom";

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                email,
                password,
            });

            const role = response.data; // Assuming the token structure includes the role
            console.log("Rol: " + role);

            // Redirect based on role
            if (role === "INVESTOR") {
                console.log("INVESTOR");
                navigation('/investorProfile', );
            // } else if (role === "STARTUP") {
            //     console.log("STARTUP");
            //     navigation('/startupProfile');
            } else if (role === "ADMIN") {
                console.log("ADMIN");
                navigation('/adminProfile');
            } else {
                setErrorMessage('Role not recognized!');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('No user with that email was found!');
            } else {
                setErrorMessage('An unexpected error occurred. ' + error);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {/*<button type="submit">Login</button>*/}
                <button
                    type="submit"
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </form>
        </div>
    );
};

export default Login;
