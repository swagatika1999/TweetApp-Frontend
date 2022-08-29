import React, { useEffect, useState } from "react";
import './Usertweets.css';
import { useNavigate } from "react-router";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Usertweetsdisplay from './Usertweetsdisplay';
import swal from'sweetalert';

const Usertweets=(props)=>{
    const navigate=useNavigate();
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const loginId=localStorage.getItem('usrname');
    const postTweetHandler=async()=>{
      

        const requestBody={
            title:title,
            tweet:description
        }
        console.log(requestBody);

        try{
            const response=await axios.post(`http://localhost:8081/postTweet/${loginId}/add`,requestBody);
            const tweetid=localStorage.setItem(response.data.tweetId);
            console.log(response);
            swal("Success","Tweet posted Successfully",{
                buttons:false,
                timer:2000 });

        }catch(e){}
    }

    const logoutHandler=(e)=>{
       
        swal("Success","successfully logged out",{
            buttons:false,
            timer:8000,
        })
        navigate("/")
}
    const titleHandler=(e)=>{
        setTitle(e.target.value);
    }

    const descriptionHandler=(e)=>{
        setDescription(e.target.value);
    }
    return(
        <>
       <div className="header" >
           <a href="" className="logo">Just Tweet it !</a>

           <div className="header-left">
              <a href="" onClick={()=>navigate("/homepage")}> Tweets </a>
              <a href="" className="active"> Your Tweets </a>
              <a href="" onClick={()=>navigate("/homepage/users")}> Users </a>
           </div>
            <div className="header-right">
                <a href="" onClick={(e)=>logoutHandler()} >Logout</a>
            </div>      
       </div>
       
            <div className="h3">
                <h3>Welcome {loginId} !</h3>
            </div>
        <div>
        <form onSubmit={postTweetHandler}>
            <br></br>
            <div className="box1">
                <textarea 
                    rows="2" 
                    cols="50" 
                    name="title"  
                    placeholder="Add the title" 
                    value={title}
                    onChange={titleHandler}
                    required />
            </div>
            <div className="box1">
                <textarea 
                     rows="5" 
                     cols="50"
                    name="description" 
                    placeholder="Want to express ? Express it." 
                    value={description}
                    onChange={descriptionHandler}
                    required />
            </div>
           
            <div className="button">
                <Button type="submit" color="primary" variant="contained">Post Tweet</Button>
            </div>
        </form>
        </div>
        <div>
            <Usertweetsdisplay />
        </div>
       </>
    )
}

export default Usertweets;