import React, { useEffect, useState } from "react";
import Layout from "../UI/Layout/Layout";
import { ListItem,ListItemText } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import axios from 'axios';
import formatDistance from 'date-fns/formatDistance'
import './Comments.css';
import {useHistory,useParams,useNavigate} from "react-router-dom";
import swal from'sweetalert';

const Comments=()=>{
    const {id}=useParams()
    const[commentList,setCommentList]=useState([]);
    const[tweet,setTweet]=useState([]);
    const[comment,setComment]=useState('');

    const formattedDate =(date)=> {
        const datetimestr=date
        const str=formatDistance(
            new Date(datetimestr),
            new Date()
        );
        return str;
    }

    const getUserComments= async ()=>{
        const response=await axios.get(`http://localhost:8081/tweets/all/comments/${id}`)
       console.log(response.data);
       const listComment=await response.data
       setCommentList(listComment);
     }


     const getUsertweet= async ()=>{
        const response=await axios.get(`http://localhost:8081/tweetsbyId/${id}`)
       console.log(response.data);
       const tweets=await response.data
       console.log(tweets)
       setTweet(tweets);
     }

     const postCommentHandler=async()=>{
      
        const requestBody={
            comment:comment
        }
        console.log(requestBody);
        const username=localStorage.getItem('usrname');
        try{
            const response=await axios.post(`http://localhost:8081/tweets/${username}/reply/${id}`,requestBody);
            console.log(response);
            swal("Success","Comment posted Successfully",{
                buttons:false,
                timer:2000 });

        }catch(e){}
    }
    const commentHandler=(e)=>{
        setComment(e.target.value);
    }

     useEffect(()=>{
        getUsertweet();
        getUserComments();
    },[])
    return(
        <>
            <div>
                <Layout />
            </div>
            {
                <>
                        <div className="post">
                            <div className="post__header">
                                <ListItem>
                                    <ListItemText  primary={<h5 style={{fontWeight:"bold"}}>{tweet.loginId}</h5>}
                                     secondary={
                                        <>
                                        <div><p style={{fontWeight:"bold"}}>{Moment(tweet.creationDate).format("  HH:mm")}</p></div>
                                        <div><p style={{fontWeight:"bold"}}>{Moment(tweet.creationDate).format(" DD/MM/YYYY")}</p></div></>} 
                                      
                                    /> 
                                </ListItem>  
                                <ListItem>
                                        <h5>{tweet.title}</h5>
                                </ListItem>
                                <ListItem>
                                    <h6>{tweet.tweet} </h6>
                                </ListItem>
                        </div>
                    </div>
                    
                    </>
                }
            <div ><h5 style={{textAlign:"center"}}>Comments</h5>
            <div>
            <form onSubmit={postCommentHandler}>
           
            <div className="box1">
                <textarea 
                    rows="5" 
                    cols="50" 
                    name="comment"  
                    placeholder="Post your thoughts / reply" 
                    value={comment}
                    onChange={commentHandler}
                    required />
            </div>
            <div className="button">
                <Button type="submit" color="primary" variant="contained">Post Comment</Button>
            </div>
            </form>
            </div>
            
            {
            commentList.map((i) => {
               
                return(
                <>
                    
                    <div className="post1">
                        <div className="post__header">
                            <ListItem>
                                <ListItemText  primary={<h5 style={{fontWeight:"bold"}}>{i.loginId}</h5>}
                                secondary={
                                    <>
                                    <div><p style={{fontWeight:"bold"}}>{formattedDate(i.commentPostedDate)} ago</p></div>
                                    <div><p style={{fontWeight:"bold"}}>{Moment(i.commentPostedDate).format("DD/MM/YYYY")}</p></div></>} 
                                 /> 
                            </ListItem>  
                            <ListItem>
                                <h6>{i.comment} </h6>
                            </ListItem>
                    </div>
                </div>
                
               
                </>
                )
            })
        }
        </div>
        </>

    )
}

export default Comments;