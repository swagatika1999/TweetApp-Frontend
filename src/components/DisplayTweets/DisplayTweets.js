import React, { useEffect, useState } from "react";
import './DisplayTweets.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Link } from "react-router-dom";
import formatDistance from 'date-fns/formatDistance'
import { ListItem,ListItemText } from "@material-ui/core";
import Moment from 'moment';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Button from '@material-ui/core/Button';
import {cyan} from "@mui/material/colors";
import {Stack} from 'react-bootstrap';
import axios from 'axios';


const Displaytweets=()=>{
    const [tweetList,setTweetList]=useState([]);
    const [isLikePressed,setIslikePressed]=useState(false);

    const formattedDate =(date)=> {
        const datetimestr=date
        const str=formatDistance(
            new Date(datetimestr),
            new Date()
        );
        return str;
    }
    

      
    const displayTweetHandler=async(e)=>{
        //e.preventDefault();

        try{
            const response=await axios.get(`http://localhost:8081/all`);
            console.log(response.data)
            const listtweet=await response.data;
            setTweetList(listtweet);
            console.log(listtweet);

            }catch(e){console.log(e)}
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

    useEffect(() => {
       
            displayTweetHandler();
            
    },[]);

    return(
        <>
           
                {
                    tweetList.map((i) => {
                       
                       
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
                               
                                <Button color="primary" variant="contained">
                                <Link to={`/Comments/${i.tweetId}`} >
                                <ChatBubbleIcon fontSize="small" style={{color: cyan[50]}}>    
                                </ChatBubbleIcon></Link>
                                </Button>
                                <Button color="primary" variant="contained" onClick={(e)=>likeTweetHandler(true,i.tweetId)}><ThumbUpIcon fontSize="small" style={{color: cyan[50]}} />{i.likes}</Button>
                            
                            </Stack>
                        </div>
                    </div>
                    
                   
                    </>
                    )
                    })
                }

    
        
        </>
    )

}

export default Displaytweets;