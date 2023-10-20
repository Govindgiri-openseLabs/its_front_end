import React, { useState } from 'react';
import '../styles/login_css.css';
import {GetUserInfo} from "../services/user_api"
import { useNavigate } from "react-router-dom";
import ImageMapComponent from "./user_define";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
   // route change
    const navigate=useNavigate();

  const handleInputChange = (e) => {
    setErrorMessage(''); // Clear the error message when input changes
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data={"email":email,"password":password};
    GetUserInfo(data)
    .then((response)=>{
      if(response.error)
      {  
         alert(response.error.response.data)
      }
      else 
      { 
        navigate(`/dashboard/${response.data.email}`);
    }
    })
    .catch((error)=>{
      alert(error)
    })
  
  };

const ChangeRoute=()=>{
  navigate("/register");
}

const smtp_setup=()=>{
  alert("smtp not added we will work on it !!!");
}
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit} className='btn'>Login</button>
        <button type="button" onClick={smtp_setup} className='btn'>Forgot Password</button> {/* Forgot Password button */}
        <button type="button" onClick={ChangeRoute} className='btn'> Sign Up</button> {/* Sign Up button */}
      </form>
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>  
  );
}

export default Login;
