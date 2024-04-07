import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';
import axios from 'axios';

function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the role stored in localStorage is not "ADMIN"
        if (localStorage.getItem('role') !== 'ADMIN') {
            // Redirect to some other page if not "ADMIN"
            navigate('/' + localStorage.getItem('role'));
        }
    }, [navigate]); // Dependency array includes navigate to re-run if navigate changes

    const returnToken = () => {
        return localStorage.getItem('token');
    };

    const [userRegister, setUserRegister] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserRegister((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validate role selection immediately
        if (name === 'role') {
            if (value !== 'INVESTOR' && value !== 'STARTUP') {
                setErrorMessage('Invalid role. Please choose either "INVESTOR" or "STARTUP".');
            } else {
                setErrorMessage(''); // Clear error message if valid role
            }
        }
    };

    const [errorMessage, setErrorMessage] = useState(''); // State to display error message

    const registerInvestorAndStartup = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = userRegister;

        if (!name || !email || !password || !role) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        try {
            const token = returnToken();

            if (token) {
                const apiUrlAdmin = 'http://localhost:8080/api/admin/register';
                const responseRegisterADMIN = await axios.post(
                    apiUrlAdmin,
                    userRegister,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    }
                );
                console.log(responseRegisterADMIN.data);

                // Reset form, clear error message, and provide success feedback (optional)
                setUserRegister({ name: '', email: '', password: '', role: '' });
                setErrorMessage('');
            }
        } catch (error) {
            console.error('There was an error!', error);
            setErrorMessage('An error occurred during registration. Please verify email and password input.', error.response.data);
        }
    };

    return (
        <Container>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                <select
                    name="role"
                    value={userRegister.role}
                    onChange={handleChange}
                    placeholder="Role"
                    required
                >
                    <option value="">Select Role</option>
                    <option value="INVESTOR">INVESTOR</option>
                    <option value="STARTUP">STARTUP</option>
                </select>
                <button type="submit">User Register</button>
            </form>
        </Container>
    );
}

export default AdminPage;
