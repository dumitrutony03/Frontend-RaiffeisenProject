import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [investor, setInvestor] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvestor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const returnToken = () =>{
        return localStorage.getItem('token')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = 'http://localhost:8080/api/auth/authenticate';

        // BEST PRACTICE

        // axios.post(apiUrl, investor).then(
        //
        //
        //     (response)=>{
        //
        //     }
        // ).catch(()=>{
        //
        // });

        try {
            const response = await axios.post(apiUrl, investor, {'Authorization': 'Bearer ' + returnToken()});

            console.log(response.data)

            // Reset form or provide further user feedback
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={investor.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={investor.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">User Login</button>
        </form>
    );
}

export default LoginForm;
