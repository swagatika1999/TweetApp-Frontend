import React, { useState } from "react";
import './Homepage.css';
import { useNavigate } from "react-router";
import Displaytweets from "../DisplayTweets/DisplayTweets";
import swal from'sweetalert';
const Homepage=(props)=>{
    const navigate=useNavigate();
    const loginId=localStorage.getItem('usrname');

    const logoutHandler=(e)=>{
       
            swal("Success","successfully logged out",{
                buttons:false,
                timer:2000,
            })
        .then(navigate("/"))
    }
    
    return(
        <>
       <div className="header" >
           <a href="" className="logo">Just Tweet it !</a>

           <div className="header-left">
              <a href="" className="active"> Tweets </a>
              <a href="" onClick={()=>navigate("/homepage/yourtweets")}> Your Tweets </a>
              <a href="" onClick={()=>navigate("/homepage/users")}> Users </a>
           </div>
            <div className="header-right">
                <a href="" onClick={(e)=>logoutHandler()}>Logout</a>
            </div>      
       </div>
       
            <div className="h3">
                <h3>Welcome {loginId} !</h3>
            </div>
            <div>
                <Displaytweets />
            </div>

       </>
    )
}

export default Homepage;