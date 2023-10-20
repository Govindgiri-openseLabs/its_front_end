import React, { useState } from 'react';
import '../styles/signup_css.css';
import {AddUserInfo} from "../services/user_api"
import { useNavigate } from "react-router-dom";


function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  
  // route change
    const navigate = useNavigate();

  // call submit function

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform user registration here
    const userData = {"first_name":firstName,
                      "last_name":lastName,
                      "email":email,
                      "password":password,
                      "address": {
                                "street":street,
                                 "city":city,
                                 "state":state,
                                 "postal_code":postalCode,
                                 },
                      "phone_number":mobileNumber,
    };
    AddUserInfo(userData)
    .then((response)=>{
      if(response.error)
      {  
         alert(response.error.response.data)
         return;
      }
      else 
      {
         alert("user addedd sucessfully")
         navigate(`/dashboard/${email}`);
      }
    })
    .catch((error)=>{
      alert(error)
    })
    

  };
const ChangeRoute=()=>{
  navigate(`/login`);
}
  return (
    <div className="signup-container">
      <h1>Register User</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Name Section */}
        <fieldset>
          <legend>Name</legend>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </fieldset>

        {/* Contact Information Section */}
        <fieldset>
          <legend>Contact Information</legend>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mobile Number:</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
        </fieldset>

        {/* Address Section */}
        <fieldset>
          <legend>Address</legend>
          <div>
            <label>Street:</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Postal Code:</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
        </fieldset>

        <button type="submit" onClick={handleSubmit}>Register</button>
        <button type="submit" onClick={ChangeRoute}>Existing User</button>
      </form>
    </div>
  );
}

export default SignUp;
