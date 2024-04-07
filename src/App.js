import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// import PrivateRoute from './components/misc/PrivateRoute'
import Login from './components/home/LoginForm'
import WelcomePage from "./components/WelcomePage";
import AdminPage from "./components/admin/AdminPage";
import InvestorPage from "./components/investor/InvestorPage";
import StartupPage from "./components/startup/StartupPage";

function App() {
    return (
        <Router>
            <Routes>
                {/*Caile unde putem ajunge*/}
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/ADMIN' element={<AdminPage/>}/>
                <Route path='/INVESTOR' element={<InvestorPage/>}/>
                <Route path='/STARTUP' element={<StartupPage/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>
    )
}

export default App