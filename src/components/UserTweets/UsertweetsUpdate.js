import React,{useEffect, useState} from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import swal from'sweetalert';
import {useHistory,useParams,useNavigate} from "react-router-dom";
import './UsertweetsUpdate.css';
import Layout from "../UI/Layout/Layout";

const UsertweetsUpdate=()=>{
    const navigate=useNavigate();
    const [title,setTitle]=useState('')
    const [tweet,setTweet]=useState('')
    const{ username }=useParams();
    const { id }=useParams();

    useEffect(()=>{
        const getUser=async()=>{
            try{
                const res=await axios.get(`http://localhost:8081/tweetsbyId/${id}`)
                const res1=await res.data.title;
                const res2=await res.data.tweet;
                console.log(res2)
                setTitle(res1)
                setTweet(res2)

            }catch(error){console.log(error)}
        }
        getUser();
    },[username,id]);
   
    const titleChangeHandler=(e)=>{
        setTitle(e.target.value);
    }
    const tweetChangeHandler=(e)=>{
        setTweet(e.target.value);
    }
    const updateTweetId= async(e)=>{
        e.preventDefault()
        const requestBody={
            title:title,
            tweet:tweet
        }
        try{
        
        const res=axios.put(`http://localhost:8081/tweets/${username}/update/${id}`,requestBody)
        console.log('Item updated successfully')
        console.log(res);
        swal("Success","Tweet updated Successfully",{
            buttons:false,
            timer:2000})

           
        }catch(error){alert(error)}
        
    }

    const returnToParentPage=()=>{
        navigate("/homepage/yourtweets");
    }

    return(
    <>
    <div><Layout /></div>
    <br></br>
    <h3 className="h3-text">Update your tweet</h3>
    <br></br>
    <form onSubmit={updateTweetId} >
        <div className="box1">
            <textarea 
             rows="2" 
             cols="50" 
             name="title"  
             placeholder="Add the title" 
             value={title}
             onChange={titleChangeHandler}
             required />
        </div>
    <div className="box1">
        <textarea 
        rows="5" 
        cols="50"
        name="description" 
        placeholder="Want to express ? Express it." 
        value={tweet}
        onChange={tweetChangeHandler}
        required />
    </div>

    <div className="button">
        <Button type="submit" color="primary" variant="contained" >Update Tweet</Button>
        </div>
        <br></br>
        <div className="button">
            <Button type="button" color="primary" variant="contained" onClick={returnToParentPage}>Your tweets</Button>
        </div>
        
       </form>
       </>
    )
}

export default UsertweetsUpdate;