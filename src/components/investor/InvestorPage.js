import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const InvestorPage = () => {
    const navigate = useNavigate();
    const [investorDetails, setInvestorDetails] = useState({
        name: '',
        email: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if the role stored in localStorage is not "ADMIN"
        if (localStorage.getItem("role") !== "INVESTOR" && localStorage.getItem("role") !== "ADMIN") {
            // Redirect to some other page if not "ADMIN"
            navigate("/" + localStorage.getItem("role"));
        }
        // Additional logic for the admin page can go here
    }, [navigate]); // Dependency array includes navigate to re-run if navigate changes

    // Afisam detaliile investitorului LOGAT, pe pagina acestuia

    useEffect( () => {
        const handleChange = async () => {
            try {
                const token = localStorage.getItem("token");

                const apiUrl = 'http://localhost:8080/api/investors/investorDetails';
                const response = await axios.post(apiUrl, token, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                // setResponseData(response.data); // ce primim din backend ca raspuns la http request
                setInvestorDetails(response.data)
            } catch (error) {
                setError(error.message);
            }
        };
        handleChange();
    }, []);

    const investorLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Optionally, navigate to the login page
        navigate('/login');
    };

    return (
        <div>
            <button onClick={investorLogout}>LOGOUT</button>
            <h2>Investor's Details: </h2>
            <p>name: {investorDetails.name}</p>
            <p>email: {investorDetails.email}</p>
            {error && <p>Error: {error}</p>}

            {/*// Buton de LOGOUT*/}

        </div>
    );
};

export default InvestorPage;
