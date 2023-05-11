import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.scss"


const Login = () => {
  const navigate = useNavigate()

  async function handleSubmit(event:any) {
    event.preventDefault();
    try {
        const password = event.target.elements.passwordLogin.value;
        const email = event.target.elements.emailLogin.value;
        console.log("password: " , password)
        //@ts-ignore
        const { data } = await axios.post("/api/customer/login", {email, password});
        console.log("recived: ", data);
        if(data.ok == true){
          navigate("/home")
        }
      } catch (error) {
        console.error(error);
      }
  }
  return (
       <div className="login-signup-page">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            <input id="emailLogin" type="text" placeholder="email address"/>
            <input id="passwordLogin" type="password" placeholder="password"/>
            <button>login</button>
            <p className="message">Not Registered? <Link to="/register">Sign up</Link></p>

          </form>
        </div>
      </div>
  );
};

export default Login;
