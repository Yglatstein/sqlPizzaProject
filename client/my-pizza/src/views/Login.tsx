import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.scss"


const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  
  async function getUserFromCookie () {
    const { data } = await axios.get("/api/customer/by-cookie");
    if (data.results != "no user found") setUser(data.results)
  }
  useEffect(() => {
    getUserFromCookie()
    }, []);

  function handleLogout(){
    document.cookie = document.cookie + "=; expires="+ new Date(0).toUTCString();
    navigate("/home")
  } 

  async function handleSubmit(event:any) {
    event.preventDefault();
    try {
        const password = event.target.elements.passwordLogin.value;
        const email = event.target.elements.emailLogin.value;
        //@ts-ignore
        const { data } = await axios.post("/api/customer/login", {email, password});
        if(data.ok == true){
          navigate("/home")
        }
      } catch (error) {
        console.error(error);
      }
  }
  return (
       <div className="login-signup-page">
        {user === null ? (
          <div className="form">
            <form className="login-form" onSubmit={handleSubmit}>
              <input id="emailLogin" type="text" placeholder="email address"/>
              <input id="passwordLogin" type="password" placeholder="password"/>
              <button>login</button>
              <p className="message">Not Registered? <Link to="/register">Sign up</Link></p>
            </form>
          </div>
        ) : (
          <div className="logout">
            you are logged in as {user.first_name}<br></br>
            <button onClick={handleLogout}>Click Here To Log Out</button>
            <br></br>
          </div>
        )}
      </div>
  );
};

export default Login;
