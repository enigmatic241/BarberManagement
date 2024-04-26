import React from 'react'

import Home from './App/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import UserHome from './App/UserHome/UserHome';


const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/customer_home" element={<UserHome />} />
                <Route element={<></>} />

            </Routes >
        </BrowserRouter >
    );

}

export default AppRoutes