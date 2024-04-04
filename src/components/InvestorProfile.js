import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvestorProfile = ({ route, navigation }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            };
            const { data } = await axios.get('http://localhost:8080/api/users/investorProfile', config);
            setProfile(data);
        };

        fetchProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h2>Investor Profile</h2>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            {/* Display more profile details as needed */}
        </div>
    );
};

export default InvestorProfile;
