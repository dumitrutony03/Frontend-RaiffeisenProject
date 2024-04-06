import React, {useState} from 'react';
import axios from 'axios';
import {Route, useNavigate} from "react-router-dom";


function LoginForm() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const returnToken = () => {
        return localStorage.getItem("token");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // BEST PRACTICE

        // axios.post(apiUrl, user).then(
        //
        //
        //     (response)=>{
        //
        //     }
        // ).catch(()=>{
        //
        // });

        try {
            var token = returnToken();

            const apiUrl = 'http://localhost:8080/api/auth/authenticate';
            const response = await axios.post(apiUrl, user,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            e.target.reset()

            // RENEW THE LAST TOKEN, OBVIOUSLY IT IS EXPIRED AFTER 1 HOUR!
            console.log(response.data.token);
            const newToken = response.data.token;

            localStorage.setItem("token", newToken);

            const responsee = await axios.post(apiUrl, user,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );


            user.email='';
            user.password='';

            const usersRole = responsee.data.role;
            localStorage.setItem("role", usersRole)

            // ####### NAVIGATE to the designed page.
            if (usersRole === "STARTUP"){

            }else if (usersRole === "INVESTOR"){
                navigate("/investorsPage")

            }else{
                // ADMIN - poate inregistra STARTUP SI INVESTOR
                navigate("/adminPage");
            }
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
