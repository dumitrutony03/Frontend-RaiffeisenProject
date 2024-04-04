import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import InvestorProfile from './components/InvestorProfile';
import LandingPage from "./components/LandingPage";
import AdminProfile from "./components/AdminProfile";
// import StartupProfile from './components/StartupProfile';
// import AdminProfile from './components/AdminProfile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/investorProfile" element={<InvestorProfile />} />
                {/*<Route path="/startupProfile" element={<StartupProfile />} />*/}

                <Route path="/adminProfile" element={<AdminProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
