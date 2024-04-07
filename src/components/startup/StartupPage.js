import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import {useNavigate} from "react-router-dom"; // Import useTable hook

const StartupPage = () => {
    const [investors, setInvestors] = useState([]);
    // const investors = [
    //     { name: 'John Doe', email: 'john.doe@example.com' },
    //     { name: 'Jane Smith', email: 'jane.smith@example.com' },
    //     // ... other investors
    // ];
    const [error, setError] = useState(null);

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
                // const response = await axios.post('http://localhost:8080/api/startups/allInvestors');

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


    // Define table columns
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: (investor) => investor.name, // Assuming 'name' exists in InvestorDto
            },
            {
                Header: 'Email',
                accessor: (investor) => investor.email, // Assuming 'email' exists in InvestorDto
            },
            // Add more columns as needed based on your InvestorDto structure
        ],
        [] // Empty dependency array to prevent unnecessary re-renders
    );

    // Use the useTable hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: investors });

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
    // return (
    //     <div>
    //         <h2>Investors</h2>
    //         <ul>
    //             {investors.map((investor) => (
    //                 <li key={investor.id}> {/* Assuming 'id' exists in each investor */}
    //                     {investor.name} - {investor.email}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};

export default StartupPage;
