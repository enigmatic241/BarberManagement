import React from 'react'

import Home from './App/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login, { Logout } from './Login/Login';
import Register from './Register/Register';

import UserHome from './App/UserHome/UserHome';
import PrimarySearchAppBar from '../AppBar/AppBar';


const AppRoutes = () => {

    return (

        <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer_home" element={<UserHome />} />
            <Route element={<></>} />


        </Routes >

    );

}

export default AppRoutes