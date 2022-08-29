import React,{useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useParams} from "react-router-dom";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Button from '@material-ui/core/Button';
import {cyan} from "@mui/material/colors";
import './ParticularUsertweets.css';
import {Stack} from 'react-bootstrap';
import formatDistance from 'date-fns/formatDistance'
import { ListItem,ListItemText } from "@material-ui/core";
import Moment from 'moment';
import Layout from "../../UI/Layout/Layout";

const ParticularUsertweets=()=>{
    const [usertweets,setUsertweets]=useState([]);
    const [isLikePressed,setIslikePressed]=useState(false);
    const{ username }=useParams();
    const getUsertweets= async ()=>{
        const response=await axios.get(`http://localhost:8081/tweets/${username}`)
       console.log(response.data);
       const listtweet=await response.data
       setUsertweets(listtweet);
       if(listtweet.length===0 || listtweet.length==='undefined'){
          return( <h2>User has not posted the tweet yet!</h2>)
       }
     }

     const formattedDate =(date)=> {
        const datetimestr=date
        const str=formatDistance(
            new Date(datetimestr),
            new Date()
        );
        return str;
    }
     const likeTweetHandler=async(likespressed,tweetId)=>{
        const loginId=localStorage.getItem('usrname');
        const rqbody={
            islikePressed:likespressed
        }
        
        try{
            setIslikePressed(likespressed);
            const res=await axios.put(`http://localhost:8081/tweets/${loginId}/like/${tweetId}`,rqbody)
            console.log(res);
            window.location.reload(false);
        }catch(e){console.log(e);}
        setIslikePressed(false)
    }
     useEffect(()=>{
        getUsertweets();
     },[])

     return(
        <> 
        <div>
            <Layout />
        </div>
        <br></br> 
        <div class="text-center"><h3>{username}'s tweet</h3></div>         
        <br></br>
        {usertweets.length > 0 ? (
           
            usertweets.map((i) => {
               
                return(
                <>
                    
                    <div className="post">
                            <div className="post__header">
                                <ListItem>
                                    <ListItemText  primary={<h5 style={{fontWeight:"bold"}}>{i.loginId}</h5>}
                                    secondary={
                                        <>
                                        <div><p style={{fontWeight:"bold"}}>{formattedDate(i.creationDate)} ago</p></div>
                                        <div><p style={{fontWeight:"bold"}}>{Moment(i.creationDate).format("DD/MM/YYYY")}</p></div></>} 
                                        /> 
                                </ListItem>  
                                <ListItem>
                                        <h5>{i.title}</h5>
                                </ListItem>
                                <ListItem>
                                    <h6>{i.tweet} </h6>
                                </ListItem>
                        
                            <Stack direction="horizontal" gap={2} style={{padding:"10px"}}>
                               
                                <Button color="primary" variant="contained"><ChatBubbleIcon fontSize="small" style={{color: cyan[50]}}>
                                    
                                </ChatBubbleIcon>
                                </Button>
                                <Button color="primary" variant="contained" onClick={e=>likeTweetHandler(true,i.tweetId)}><ThumbUpIcon fontSize="small" style={{color: cyan[50]}} />{i.likes}</Button>
                            
                            </Stack>
                        </div>
                    </div>
               
                </>
                )
            })
        ) : (
            <>
                <h2 class="text-center"> {username} has not posted anything! </h2>
            </>
        )}

  


        </>
    )
}

export default ParticularUsertweets;