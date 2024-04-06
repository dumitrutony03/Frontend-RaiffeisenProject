import React, {useEffect, useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import axios from "axios";

function AdminPage() {
    const navigate = useNavigate();

    const returnToken = () => {
        return localStorage.getItem("token");
    }

    const showAllUsersInTable = async (e) => {
        e.preventDefault();
        try {
            var token = returnToken();
            console.log("Token: " + token)

            if(token) {
                console.log("Token valid!");

                const apiUrlAdmin = 'http://localhost:8080/api/admin/nrOfUsers';
                const responseADMIN = await axios.get(apiUrlAdmin, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                console.log(responseADMIN.data);
            }

            // Reset form or provide further user feedback
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <button type="button" onClick={showAllUsersInTable}>
            ShowAllUsers
        </button>
    );

    return (
        <Container>
        </Container>
    )
}

export default AdminPage