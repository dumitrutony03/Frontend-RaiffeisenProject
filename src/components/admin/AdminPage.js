import React, {useEffect, useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {Container, Table} from 'semantic-ui-react'
import axios from "axios";

function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the role stored in localStorage is not "ADMIN"
        if(localStorage.getItem("role") !== "ADMIN") {
            // Redirect to some other page if not "ADMIN"
            navigate("/" + localStorage.getItem("role"));
        }
        // Additional logic for the admin page can go here
    }, [navigate]); // Dependency array includes navigate to re-run if navigate changes


    const returnToken = () => {
        return localStorage.getItem("token");
    }

    const [userRegister, setUserRegister] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserRegister(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const registerInvestorAndStartup = async (e) => {
        e.preventDefault();
        try {
            var token = returnToken();

            if(token) {
                console.log("Token valid!");
                console.log("Ce am primit in INPUT in UI:" + userRegister.name);

                const apiUrlAdmin = 'http://localhost:8080/api/admin/register';
                const responseRegisterADMIN = await axios.post(apiUrlAdmin, userRegister,{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                console.log(responseRegisterADMIN.data);
            }

            // Reset form or provide further user feedback
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={registerInvestorAndStartup}>
            <input
                type="name"
                name="name"
                value={userRegister.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="email"
                name="email"
                value={userRegister.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={userRegister.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                type="role"
                name="role"
                value={userRegister.role}
                onChange={handleChange}
                placeholder="Role"
                required
            />
            <button type="submit">User Register</button>
        </form>

    );
}

export default AdminPage