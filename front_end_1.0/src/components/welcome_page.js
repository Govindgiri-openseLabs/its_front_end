import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
 const navigate=useNavigate();
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (event,type) => {
    setUserType(event.target.value);
    if(type==='new')
    navigate("/register")
    if(type==="old")
    navigate("/login")
  };

  const styles = {
    container: {
        opacity:"1.3",
      position: "absolute",
      top: "230px",
      width: '80%',
      left:"10%",
      right:"10%",
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'rgba(224, 242, 241, 0.7)', // Background color with transparency
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      backgroundSize: 'cover',
    },
    heading: {
      fontSize: '24px',
      color: '#333',
    },
    label: {
      display: 'block',
      margin: '10px 0',
    },
    selectedText: {
      fontSize: '16px',
      color: 'green',
    },
    welcomeText: {
      fontSize: '16px',
      color: 'blue',
    },
  };

  return (
    <div><img src='https://thumbs.dreamstime.com/b/medicine-doctor-stethoscope-touching-medical-icons-network-medicine-doctor-stethoscope-touching-icons-medical-network-111489030.jpg'
           style={{"width":"100%","height":"100vh","margin":"0%","padding":"auto","overflow":"hidden","opacity":"0.3"}}   ></img>
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Injury Record Dashboard</h1>
      <p>Please select your user type:</p>

      <label style={styles.label}>
        <input
          type="radio"
          value="existing"
          checked={userType === 'existing'}
          onChange={(e)=>handleUserTypeChange(e,"old")}
        />
        Existing User
      </label>

      <label style={styles.label}>
        <input
          type="radio"
          value="new"
          checked={userType === 'new'}
          onChange={(e)=>handleUserTypeChange(e,"new")}
        />
        New User
      </label>

      {userType && (
        <p style={styles.selectedText}>You have selected: {userType} user.</p>
      )}

      {userType === 'existing' && (
        <p style={styles.welcomeText}>Welcome back, existing user! - Yes</p>
      )}

      {userType === 'new' && (
        <p style={styles.welcomeText}>Welcome, new user! Please sign up. - No</p>
      )}
    </div>
    </div> 
  );
};

export default WelcomePage;
