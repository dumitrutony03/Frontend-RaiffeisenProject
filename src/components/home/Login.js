import React, {useState} from 'react';
import axios from 'axios';

function LoginForm() {
    const [investor, setInvestor] = useState({
        email: '',
        password: ''
    });
    const [product, setProduct] = useState(null);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setInvestor(prevState => ({
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
            var token = returnToken();

            const apiUrl = 'http://localhost:8080/api/auth/authenticate';
            const response = await axios.post(apiUrl, investor,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );

            const usersRole = response.data.role;

            if (usersRole === "STARTUP"){

            }else if (usersRole === "INVESTOR"){

            }else{
                // navigate to the designed page.
            }

            console.log("Token: " + token)
            const apiUrlAdmin = 'http://localhost:8080/api/admin/nrOfUsers';
            const responseADMIN = await axios.get(apiUrlAdmin, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log(responseADMIN);

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
