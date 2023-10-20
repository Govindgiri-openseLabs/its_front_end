import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
const Url ='http://localhost:8000';



const AddUserInfo=async (data)=>{
    try {
        const response = await axios.post(`${Url}/user/add`,data);
        return response; 
      } catch (error) {
        console.log(error,"ggggg");
          return {"error":error};
      }
}

const GetUserInfo=async (data)=>{
    try {

        const response = await axios.post(`${Url}/user/get`,data);
        return response; 
      } catch (error) {
        console.log(error,"ggggg");
          return {"error":error};
      }
}



const GetUserInjury=async (data)=>{
 try {
   
    
    const response = await axios.post(`${Url}/user/injury/get`,data);
    return response; 
  } catch (error) {
      return {"error":error};
  }
}
const AddUserInjury=async (data)=>{
  try {
    console.log("1234567")
    const response = await axios.post(`${Url}/user/injury/add`,data);
    return response; 
  } catch (error) {
    console.log(error,"ggggg");
      return {"error":error};
  }
}




export {AddUserInfo,GetUserInfo,AddUserInjury,GetUserInjury};