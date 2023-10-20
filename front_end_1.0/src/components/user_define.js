import React from 'react';
import { useState,useEffect } from 'react';
import '../styles/user_define.css'
import backImage from './../assets/images/back_image.png';
import frontImage from './../assets/images/front_image.png';
import clickImage from "./../assets/images/click.png"
import '../styles/user_dash_board.css';
import {AddUserInjury,GetUserInjury} from "../services/user_api"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const data_formate_change={
    "front-head":"face",
    "front-trunk":"trunk",
    "front-right-hand":"right_hand",
    "front-left-hand":"left_hand",
    "front-right-leg":"right_leg",
    "front-left-leg":"left_leg",

    "back-head":"head",
    "back-trunk":"back",
    "back-right-hand":"right_hand",
    "back-left-hand":"left_hand",
    "back-right-leg":"right_leg",
    "back-left-leg":"left_leg",
}


function ImageMapComponent() {
    // get email from url params
   const {email}=useParams();
    const navigate=useNavigate();
    // use state hooks
    const [front_body_array, setFrontBodyArray] = useState([]);
    const [back_body_array, setBackBodyArray] = useState([]);
    const [front_body_circle_array,set_front_body_circle_array]=useState([])
    const [back_body_circle_array,set_back_body_circle_array]=useState([])
    const [user_name,set_user_name]=useState('');
    const [Email,setEmail]=useState('');
    // get user data

   useEffect(()=>{
      setEmail(email);
      api_loader();
   },[email])



  const api_loader=()=>{
 
      GetUserInjury({"email":email})
      .then((response)=>{
          set_user_name(response.data.first_name);  
     
          const update_front_injury=[];
          const update_back_injury=[];
        //   const update_front_circle_injury=[]
        //   const update_back_circle_injury=[]

          if(response.data.front_injury.face==='true') update_front_injury.push({ "type": "Internal Injury","injury":"front-head"});
          if(response.data.front_injury.right_hand==='true') update_front_injury.push({ "type": "Internal Injury","injury":"front-right-hand"});
          if(response.data.front_injury.left_hand==='true') update_front_injury.push({ "type": "Internal Injury","injury":"front-left-hand"});
          if(response.data.front_injury.right_leg==='true') update_front_injury.push({ "type": "Internal Injury","injury":"front-right-leg"});
          if(response.data.front_injury.left_leg==='true') update_front_injury.push({ "type": "Internal Injury","injury":"front-left-leg"});
          if(response.data.front_injury.trunk==='true') update_front_injury.push({ "type": "Internal Injury","injury":"front-trunk"});
        
          if(response.data.back_injury.back==='true') update_back_injury.push({ "type": "Internal Injury","injury":"back-trunk"});
          if(response.data.back_injury.head==='true') update_back_injury.push({ "type": "Internal Injury","injury":"back-head"});
          if(response.data.back_injury.right_hand==='true') update_back_injury.push({ "type": "Internal Injury","injury":"back-right-hand"});
          if(response.data.back_injury.left_hand==='true') update_back_injury.push({ "type": "Internal Injury","injury":"back-left-hand"});
          if(response.data.back_injury.right_leg==='true') update_back_injury.push({ "type": "Internal Injury","injury":"back-right-leg"});
          if(response.data.back_injury.left_leg==='true') update_back_injury.push({ "type": "Internal Injury","injury":"back-left-leg"});
         
          setFrontBodyArray(update_front_injury);
          setBackBodyArray(update_back_injury);
          
      
      }).catch((error)=>{
         alert(error)
      })
  }




    const toggleBodyPart = (event, side) => {
        const y_axis=window.scrollY+event.clientY;
        const x_axis=window.scrollX+event.clientX;
    
      const bodyPartId = event.target.id;
      alert(bodyPartId);
    
      if (side === 'front') {
        const updatedFrontArray = [...front_body_array];
        const existingIndex = updatedFrontArray.findIndex(item => item.injury === bodyPartId);
    
        if (existingIndex !== -1) {
          // Remove the body part if it exists
        //   updatedFrontArray.splice(existingIndex, 1);
        } else {
          // Add the body part with a default type of "normal"
          updatedFrontArray.push({ type: "Internal Injury", injury: bodyPartId,"X":x_axis,"Y":y_axis });
        }
    
        setFrontBodyArray(updatedFrontArray);
      }
    
      if (side === 'back') {
        const updatedBackArray = [...back_body_array];
        const existingIndex = updatedBackArray.findIndex(item => item.injury === bodyPartId);
    
        if (existingIndex !== -1) {
          // Remove the body part if it exists
        //   updatedBackArray.splice(existingIndex, 1);
        } else {
          // Add the body part with a default type of "normal"
          updatedBackArray.push({ type: "normal", injury: bodyPartId,"X":x_axis,"Y":y_axis  });
        }
    
        setBackBodyArray(updatedBackArray);

      }

        if(side==='front'){
                        let update_front_body_circle_array=[...front_body_circle_array];
                        const existingIndex = update_front_body_circle_array.findIndex(item => item.injury === bodyPartId);
                        if(existingIndex==-1)
                        {
                        update_front_body_circle_array.push({ X:x_axis,Y:y_axis,injury:bodyPartId})
                        set_front_body_circle_array(update_front_body_circle_array);
                        }
                    }
        if(side==='back'){
                        let update_back_body_circle_array=[...back_body_circle_array];
                        const existingIndex = update_back_body_circle_array.findIndex(item => item.injury === bodyPartId);
                        if(existingIndex==-1)
                        {
                            update_back_body_circle_array.push({ X:x_axis,Y:y_axis,injury:bodyPartId})
                            set_back_body_circle_array(update_back_body_circle_array);
                        }
        }           
    };
    
    const removeItem=(injury,side)=>{
     
        if(side==='front'){
            // remove injury
            let originalArray=front_body_array;
            let newArray = originalArray.filter((item) => item.injury !== injury);
            setFrontBodyArray(newArray);
            // remove injury spot
             originalArray=front_body_circle_array;
             newArray = originalArray.filter((item) => item.injury !== injury);
            set_front_body_circle_array(newArray);
        }
        if(side==='back'){
            // remove injury
            let originalArray=back_body_array;
            let newArray = originalArray.filter((item) => item.injury !== injury);
            setBackBodyArray(newArray);
            // remove injury spot
             originalArray=back_body_circle_array;
             newArray = originalArray.filter((item) => item.injury !== injury);
            set_back_body_circle_array(newArray);
        }
      }
      
 const submitItems=(side)=>{
   
        let front_injury=[];
        let back_injury=[];
        
     //   if(side==='front'){
            front_body_array.map((item,index)=>{
                front_injury.push(data_formate_change[item.injury]);
            })      
    //    }

    //    if(side==='back'){
            back_body_array.map((item,index)=>{
                back_injury.push(data_formate_change[item.injury]);
            })
    //    }
     
       // call api
        let data={"email":email,
                  "front_injury":front_injury,
                  "back_injury":back_injury
                 }
        AddUserInjury(data).
        then((response)=>{
     
        }).
        catch((error)=>{
         
        })
      alert("Injury Added Successfully");    
        navigate("/");
     }
    



  return (
 <div>   
 <div className="image-map-container">
            <div class="welcome-box">
                 <h1>Welcome to Injury Record Website</h1>
                 <h3>{user_name||""}</h3>
                 <br></br>
            </div>

            <div className='front_circle_tag'>
                {   
                     front_body_circle_array.map((item,index)=>{
                   return <div style={{"width":"100px","height":"100px","border-radius":"50%","position":"absolute","left":item.X-242,"top":item.Y-50,"background-color":"red","opacity":"0.4","textAlign":"center"}}><span>{item.Y}</span></div>
                })
                }
            </div>
            <div className='back_circle_tag'>
                {   
                     back_body_circle_array.map((item,index)=>{
                   return <div style={{"width":"100px","height":"100px","border-radius":"50%","position":"absolute","left":item.X-242,"top":item.Y-50,"background-color":"red","opacity":"0.4","textAlign":"center"}}><span>{item.Y}</span></div>
                })
                }
            </div>
            <div><span style={{"fontSize":"40px","position":"relative","bottom":"20px"}}>Add Injury</span> <img src={clickImage} style={{"width":"70px","height":"70px"}}></img></div>
            <br></br><br></br>
            <img
                src={frontImage}
                alt="Front Image"
                useMap="#front-image-map"
                className="responsive-image" // Add a class for styling

            />
            <map name="front-image-map">
                <area id='front-head' alt="head" title="head" onClick={(e) => toggleBodyPart(e, 'front')}  coords="174,38,42" shape="circle"/>
                <area id='front-right-hand' alt="right-hand" title="right-hand" onClick={(e) => toggleBodyPart(e, 'front')} coords="1,354,18,377,46,362,64,299,84,268,111,193,113,192,113,110,91,122,67,194,31,291,15,301,6,304,2,313,8,323" shape="poly" />
                <area id='front-left-hand' alt="left_hand" title="left_hand"onClick={(e) => toggleBodyPart(e, 'front')} coords="331,372,305,362,291,312,271,268,257,246,249,215,230,190,230,115,246,111,260,127,267,157,277,184,289,229,303,260,314,289,326,298,336,305,345,313,348,321,336,316,335,325,341,339,344,354,339,365" shape="poly" />
                <area id='front-trunk' alt="trunk" title="trunk" onClick={(e) => toggleBodyPart(e, 'front')} coords="114,109,206,104,220,105,232,107,230,199,115,144,115,192,123,211,126,227,126,247,126,270,119,299,114,328,133,333,149,335,166,341,182,344,193,344,205,339,215,333,226,326,233,317,229,300,229,281,224,269,227,250,225,229,229,200,115,143" shape="poly" />
                <area id='front-left-leg' alt="left_leg" title="left_leg" onClick={(e) => toggleBodyPart(e, 'front')} coords="181,344,194,345,210,337,224,328,234,321,241,350,243,369,243,398,241,418,231,454,231,485,231,538,225,602,238,625,248,636,246,647,240,651,225,656,215,647,208,630,198,614,199,585,198,550,190,524,192,492,192,472,185,431,179,384" shape="poly" />
                <area id='front-right-leg' alt="right_leg" title="right_leg" onClick={(e) => toggleBodyPart(e, 'front')} coords="114,330,129,332,145,337,169,346,169,362,166,401,160,443,154,476,157,518,149,562,149,590,149,617,137,645,130,656,111,651,103,641,119,614,123,581,117,515,117,473,117,443,106,410,106,370" shape="poly" />
            </map>

            <img
                src={backImage}
                alt="Front Image"
                useMap="#back-image-map"
                className="responsive-image" // Add a class for styling
            />
            <map name="back-image-map">
                <area id='back-head' alt="head" title="head" onClick={(e) => toggleBodyPart(e, 'back')} coords="174,38,42" shape="circle"/>
                <area id='back-left-hand' alt="left-hand" title="left-hand" onClick={(e) => toggleBodyPart(e, 'back')} coords="1,354,18,377,46,362,64,299,84,268,111,193,113,192,113,110,91,122,67,194,31,291,15,301,6,304,2,313,8,323" shape="poly" />
                <area id='back-right-hand' alt="right_hand" title="right_hand" onClick={(e) => toggleBodyPart(e, 'back')} coords="331,372,305,362,291,312,271,268,257,246,249,215,230,190,230,115,246,111,260,127,267,157,277,184,289,229,303,260,314,289,326,298,336,305,345,313,348,321,336,316,335,325,341,339,344,354,339,365" shape="poly" />
                <area id='back-trunk' alt="trunk" title="trunk" onClick={(e) => toggleBodyPart(e, 'back')} coords="114,109,206,104,220,105,232,107,230,199,115,144,115,192,123,211,126,227,126,247,126,270,119,299,114,328,133,333,149,335,166,341,182,344,193,344,205,339,215,333,226,326,233,317,229,300,229,281,224,269,227,250,225,229,229,200,115,143" shape="poly" />
                <area id='back-right-leg' alt="right_leg" title="right_leg" onClick={(e) => toggleBodyPart(e, 'back')} coords="181,344,194,345,210,337,224,328,234,321,241,350,243,369,243,398,241,418,231,454,231,485,231,538,225,602,238,625,248,636,246,647,240,651,225,656,215,647,208,630,198,614,199,585,198,550,190,524,192,492,192,472,185,431,179,384" shape="poly" />
                <area id='back-left-leg' alt="left_leg" title="left_leg" onClick={(e) => toggleBodyPart(e, 'back')} coords="114,330,129,332,145,337,169,346,169,362,166,401,160,443,154,476,157,518,149,562,149,590,149,617,137,645,130,656,111,651,103,641,119,614,123,581,117,515,117,473,117,443,106,410,106,370" shape="poly" />
            </map>        
  
    </div>




    <div className='list_container'>
   
          <div className='front-list-container list-container'> 
                <h2>Front Body Injury</h2>
                <table>
                    <thead>
                    <tr className="list-heading">
                        <th>S.No</th>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {   front_body_array.length===0?<h3 style={{"position":"relative","left":"60%"}}>No Injury Added !!! </h3>:
                       front_body_array.map((item, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.injury}</td>
                        <td>
                            <select id="injury_options" name="inury_options" defaultValue={item.type}>
                            <option value="Internal Inury">Internal Inury</option>
                            <option value="physical deformity">physical deformity</option>
                            <option value="wound">Wound</option>
                            </select>
                        </td>
                        <td>
                            <button className="remove-button" onClick={() => removeItem(item.injury,"front")}>Remove</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={()=>submitItems('front')} className='btnn'>Submit</button>
            </div>

          


            <div className='back-list-container list-container'> 
                <h2>Back Body Injury</h2>
                <table>
                    <thead>
                    <tr className="list-heading">
                        <th>S.No</th>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {   back_body_array.length==0?<h3 style={{"position":"relative","left":"60%"}}>No Injury Added !!! </h3>: 
                       back_body_array.map((item, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.injury}</td>
                        <td>
                            <select id="fruit" name="fruit" defaultValue={item.type}>
                            <option value="Internal Inury">Internal Inury</option>
                            <option value="physical deformity">physical deformity</option>
                            <option value="wound">Wound</option>
                            </select>
                        </td>
                        <td>
                            <button className="remove-button" onClick={() => removeItem(item.injury,"back")}>Remove</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={()=>submitItems('back')} className='btnn'>Submit</button>
            </div>
      </div>
   
      </div>
  );

}

export default ImageMapComponent;
