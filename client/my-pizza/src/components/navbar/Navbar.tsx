import React from 'react'
import logo from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'
import {AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";

import './navbar.scss'


export const Navbar = () => {
  return (
    <header className='header'>
        <div className='nav__wraper'>
          <div className='logo'>
            <img src={logo} alt="" />
            <h5>PizzaMesh</h5>
          </div>
          <div className='navigation'>
            <div className="menu">
              <a href='/home'>Home</a>
              <a href='/menu'>Menu</a>
              <a href='/cart'>Cart</a>
            </div>
          </div>
          <div className='nav__right'>
            <span><a href='/cart'><i><AiOutlineShoppingCart/></i></a></span>
            <span><a href='/login'><i><AiOutlineUser/></i></a></span>
          </div>
        </div>
    </header>
    
  )
}

export default Navbar
