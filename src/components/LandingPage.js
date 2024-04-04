import React from 'react';
import './LandingPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Push to the login route
    };

    return (
        <div className="landing-page">
            <h1>Welcome!</h1>
            <p>This is a landing page for your application.</p>
            <button onClick={handleLoginClick}>Login</button>
        </div>
    );
};

export default LandingPage;
