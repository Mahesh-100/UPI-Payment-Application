import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Register from '../register/Register';
import Login from '../login/Login';
import Home from '../home/Home';
import AddAccount from '../transactions/AddAccount';
import PrimaryAccount from '../home/PrimaryAccount';
import SendMoney from '../transactions/SendMoney';
import Transaction from '../transactions/Transaction';
import UpdateProfile from '../home/UpdateProfile';

const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Login/>}/>
  <Route path="/home" element={<Home/>} />
  <Route path='/add-account' element={<AddAccount/>}/>
  <Route path='/set-primary-account' element={<PrimaryAccount/>}/>
  <Route path='/send-money' element={<SendMoney/>}/>
  <Route path='/transactions' element={<Transaction/>}/>
  <Route path='/update-profile' element={<UpdateProfile/>}/>
  </Routes>
  )
}

export default AppRoutes