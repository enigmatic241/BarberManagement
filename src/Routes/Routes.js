import React, { useEffect } from 'react'

import Home from './App/Home'

import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import UserHome from './App/UserHome/UserHome';
import AppMainPage from './App/AppMainPage';



// useEffect(() => {
//     if (!location.pathname.endsWith('/')) {
//         window?.history?.replaceState({}, '', location.pathname + '/');
//     }
// }, [location]);


const AppRoutes = () => {

    return (
        <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer_home" element={<UserHome />} />
            <Route path="/welcome" element={<AppMainPage />} />
        </Routes >

    );

}

export default AppRoutes