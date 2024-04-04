import React, {useState} from 'react';
import axios from 'axios';

const Register = ({history}) => {
    const { login } = useAuth(); // Use login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password,
            });

            const { role } = response.data; // Assuming the response structure
            console.log("Role: " + role);

            login(role); // Set role in context and localStorage

            // Redirect based on role
            if (role === "INVESTOR") {
                history.push('/investorProfile');
            } else if (role === "ADMIN") {
                history.push('/adminProfile');
            } else {
                setErrorMessage('Role not recognized!');
            }
        } catch (error) {
            // Error handling
        }
    };

    return (
        console.log("Ceva")
        // Your form code here
    )
};

export default Register;
