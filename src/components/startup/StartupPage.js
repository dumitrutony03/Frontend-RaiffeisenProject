import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useTable} from 'react-table';
import {useNavigate} from "react-router-dom";
import "./StartupPage.css";

const StartupPage = () => {
    const [investors, setInvestors] = useState([]);
    const [error, setError] = useState(null);
    const [errorSendData, setErrorSendData] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        // Check if the role stored in localStorage is not "ADMIN"
        if (localStorage.getItem("role") !== "STARTUP" && localStorage.getItem("role") !== "ADMIN") {
            // Redirect to some other page if not "ADMIN"
            navigate("/" + localStorage.getItem("role"));
        }
        console.log("StartupPage")
        // Additional logic for the admin page can go here
    }, [navigate]); // Dependency array includes navigate to re-run if navigate changes

    const startupLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Optionally, navigate to the login page
        navigate('/login');
    };

    // Se intampla automat, cand suntem directionati spre /startupPage
    useEffect(() => {
        const fetchData = async () => {
            console.log("Requesting the investors")
            try {
                const token = localStorage.getItem("token");

                const apiUrl = 'http://localhost:8080/api/startups/allInvestors';
                const response = await axios.post(apiUrl, token, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                setInvestors(response.data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };
        fetchData();
    }, []); // [] // Empty dependency array to prevent unnecessary re-renders

    const returnToken = () => {
        return localStorage.getItem('token');
    };

    const handleCellClick = (investorData) => {
        // e.preventDefault();

        console.log(investorData.name);
        console.log(investorData.email);
        console.log(investorData);

        const name = investorData.name;
        const email = investorData.email;

        try {
            const token = returnToken();
            if (token) {
                const apiUrl = 'http://localhost:8080/api/startups/s';
                const responseFromServer = axios.post(
                    apiUrl,
                    {token, name, email},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    },
                );
                console.log("Raspuns din server side: " + responseFromServer);
            } else {
                console.log("Token invalid");
            }

        } catch (errorSendData) {
            console.error('There was an error!', investorData);
            setErrorSendData('An error occurred during registration. Please verify email and password input.', error.response.data);
        }
    };

    // Define table columns
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name', // You can directly use 'name' if it directly maps to your data structure
                Cell: ({row}) => (
                    <div onClick={() => handleCellClick(row.original)} style={{cursor: 'pointer'}}>
                        {row.values.name}
                    </div>
                ),
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: ({row}) => (
                    <div onClick={() => handleCellClick(row.original)} style={{cursor: 'pointer'}}>
                        {row.values.email}
                    </div>
                ),
            },
        ],
        [] // Dependency array left empty to signify these don't depend on external variables
    );

    // Use the useTable hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: investors});

    return (
        <div>
            <button onClick={startupLogout}>LOGOUT</button>
            <h1> Startup Page </h1>
            <h2>Investors table ---></h2>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th key={column.id}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr key={row.id}>
                            {row.cells.map((cell) => (
                                <td key={cell.id}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {error && <p>Error: {error}</p>}
            {/* Add any additional content or functionalities here */}
        </div>
    );
};

export default StartupPage;