import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
        const firstName = event.target.elements.firstNameRegister.value;
        const lastName = event.target.elements.lastNameRegister.value;
        const email = event.target.elements.emailRegister.value;
        const password = event.target.elements.passwordRegister.value;
        const address = event.target.elements.addressRegister.value;
        const payment = event.target.elements.paymentRegister.value;

        if (password.length < 10 || password.length > 30)
        {
            alert("password length must be at least 10 characters and no more than 30.");
        }
        else if (password.contains(firstName))
        {
            alert("password may not contain user's first name");
        }
        else if(password.contains(lastName))
        {
            alert("password may not contain user's last name");
        }
        else if(password.contains(email))
        {
            alert("password may not contain user's email");
        }
        
        const { data } = await axios.post("/api/customer/register", {firstName, lastName, email, password, address, payment});
        if (data.ok == true){
          navigate("/Login")
        }
      } catch (error) {
        console.error(error);
      }
  }
  return (
      <div className="login-signup-page">
        <div className="form">
          <form className="register-form" onSubmit={handleSubmit}>
            <input id="emailRegister" type="text" placeholder="email address"/>
            <input id="firstNameRegister" type="text" placeholder="first name"/>
            <input id="lastNameRegister" type="text" placeholder="last name"/>
            <input id="addressRegister" type="text" placeholder="address"/>
            <input id="paymentRegister" type="text" placeholder="peyment details"/>
            <input id="passwordRegister" type="password" placeholder="password"/>
            
            <button>create</button>
            <p className="message">Already Registered? <Link to="/">Sign In</Link></p>
          </form>
        </div>
      </div>
  );
};

export default Register;
