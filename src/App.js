import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// import PrivateRoute from './components/misc/PrivateRoute'
import Login from './components/home/Login'
import WelcomePage from "./components/WelcomePage";
// import Signup from './components/home/Signup'
// import AdminPage from './components/admin/AdminPage'
// import UserPage from './components/user/UserPage'

function App() {
    return (
        <Router>
            <Routes>
                {/*Caile unde putem ajunge*/}
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>
    )
}

export default App