import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "../views/Home";
import Menu from '../views/Menu';
import PizzaDetails from '../views/PizzaDetails';
import Cart from '../views/Cart';
import Checkout from '../views/Checkout';
import Login from '../views/Login';
import Register from '../views/Register';

const Routers = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Navigate to ='/home'/>}/>
            <Route path='/home' element = {<Home />}/>
            <Route path='/menu' element = {<Menu />}/>
            <Route path='/menu/:id' element = {<PizzaDetails />}/>
            <Route path='/cart' element = {<Cart />}/>
            <Route path='/checkout' element = {<Checkout />}/>
            <Route path='/login' element = {<Login />}/>
            <Route path='/register' element = {<Register />}/>
          </Routes>
        </BrowserRouter>
      );
  };
  
  export default Routers;