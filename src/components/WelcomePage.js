import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Importul fișierului de stiluri

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <h1 className="welcome-header">Bine ai venit la GrowGenius!</h1>

            <p className="welcome-text">
                O platformă dedicată viitorului tău. <br/><br/>
                GrowGenius este locul unde pasiunile întâlnesc oportunitățile. Fie că ești un student în căutarea primului tău internship, un investitor care caută următoarea mare inovație, sau o companie în căutarea talentelor strălucite, ai ajuns unde trebuie.
            </p>
            <div className="link-container">
                <Link to="/login" className="link link-login">
                    Autentificare
                </Link>

            </div>
        </div>
    );
};

export default WelcomePage;
