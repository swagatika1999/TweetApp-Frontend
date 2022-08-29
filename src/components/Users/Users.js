import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Users.css';
import { useNavigate } from "react-router";
import UsersDisplay from "./UsersDisplay/UsersDisplay";
import swal from'sweetalert';
const Users=(props)=>{
    
    const navigate=useNavigate();
    const logoutHandler=(e)=>{
       
        swal("Success","successfully logged out",{
            buttons:false,
            timer:8000,
        })
        navigate("/")
}
   
    return(
        <>
         <div className="header" >
           <a href="" className="logo">Just Tweet it !</a>

           <div className="header-left">
              <a href="" onClick={()=>navigate("/homepage")}> Tweets </a>
              <a href=""  onClick={()=>navigate("/homepage/yourtweets")}> Your Tweets </a>
              <a href="" className="active"> Users </a>
           </div>
            <div className="header-right">
                <a href="" onClick={(e)=>logoutHandler()}>Logout</a>
            </div>      
       </div>

            <div><UsersDisplay /></div>
        </>
    )
}

export default Users;