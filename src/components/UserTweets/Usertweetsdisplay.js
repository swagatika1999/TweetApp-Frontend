import React, { useEffect, useState } from "react";
import axios from 'axios';
import Moment from 'moment';
import {  Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Stack} from 'react-bootstrap';
import { ListItem,ListItemText } from "@material-ui/core";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@material-ui/core/Button';
import CreateIcon from '@mui/icons-material/Create';
import {cyan} from "@mui/material/colors";
import './Usertweetsdisplay.css';
import formatDistance from 'date-fns/formatDistance'
import swal from'sweetalert';

const Usertweetsdisplay = () =>{
    const loginId=localStorage.getItem('usrname');
    const [usertweets,setUsertweets]=useState([]);
    
    const formattedDate =(date)=> {
        const datetimestr=date
        const str=formatDistance(
            new Date(datetimestr),
            new Date()
        );
        return str;
    }

    const getUsertweets= async ()=>{
       const response=await axios.get(`http://localhost:8081/tweets/${loginId}`)
      console.log(response.data);
      const listtweet=await response.data
      setUsertweets(listtweet);
    }
    const deleteTweetById= async(username,id)=>{
        try{
            
        const res=axios.delete(`http://localhost:8081/tweets/${username}/delete/${id}`)
       
        console.log('Item deleted successfully')
        console.log(res);
        swal("Success","Deleted Successfully",{
            buttons:false,
            timer:2000})
            window.location.reload(false);
        }catch(error){alert(error)}
        
    }
    
   
    useEffect(() => {
        getUsertweets();
       
    },[]);
    return(
        <> 
        <br></br>          
        {
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
                            <Button color="primary" variant="contained"><ThumbUpIcon fontSize="small" style={{color: cyan[50]}} />{i.likes}</Button>
                            <Button color="primary" variant="contained" onClick={()=>deleteTweetById(i.loginId,i.tweetId)}><DeleteIcon fontSize="small" style={{color: cyan[50]}} /></Button>
                            <Button color="primary" variant="contained" >
                                <Link to={`/${i.loginId}/edit/${i.tweetId}`} >
                                <CreateIcon fontSize="small" style={{color: cyan[50]}} /></Link></Button>

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

export default Usertweetsdisplay;