import React, { useEffect, useState } from "react";
import  Card  from "react-bootstrap/Card";
import './UsersDisplay.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {  Link } from "react-router-dom";

const UsersDisplay=()=>{
    const[userList,setUserlist]=useState([])
    const[filteredResults,setFilteredResults]=useState([]);
    const[searchText,setSearchText]=useState('');
    const UserDisplayHandler=async()=>{
        const response=await axios.get(`http://localhost:8081/users/all`)
        const res=await response.data;
        console.log(res);
        setUserlist(res);
    }

    const searchHandler=(searchInput)=>{
        setSearchText(searchInput)
        if(searchText!== ''){
            const filteredData=userList.filter((item)=>{
                return Object.values(item.loginId).join('').toLowerCase().includes(searchText.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(userList)
        }
    }

    
    
    useEffect(()=>{
        UserDisplayHandler();
    },[])
    return(
        <>
        <div style={{padding : 20}}>
        <div class="text-center">
        <label htmlFor="search" style={{color:"navy",fontWeight:"bold"}}><h4>Search user : </h4></label>
        <span> <input type="text" 
               placeholder='Search...'
               name="search"
               style={{alignContent:'center',alignItems:'center'}}
               onChange={(e)=>searchHandler(e.target.value)}/></span>
        </div>
        
               
        <div className="container-fluid mt-5">
        <div className="row text-center">
        {searchText.length > 1 ? (
                filteredResults.map((user)=>{
                    return(
                        <div className="col-10 col-md-4 mt-5">
                            <Card style={{width:'18rem'}}>
                                <Card.Body>
                                    <Card.Title><h4 style={{color:"Navy",fontWeight:"bold"}}>{user.loginId}</h4></Card.Title>
                                    <br></br>
                                    <Card.Text >
                                        <h6>Firstname : {user.firstName}</h6>
                                    </Card.Text>
                                    <Card.Text >
                                        <h6>Lastname : {user.lastName}</h6>
                                    </Card.Text>
                                    <Link to={`/displaytweets/${user.loginId}`} >
                                        <Button color="primary" variant="contained">Get tweet</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })

            ):(userList.map((user) => {
                return(
                <>
                    <div className="col-10 col-md-4 mt-5">
                            <Card style={{width:'18rem'}}>
                                <Card.Body>
                                    <Card.Title><h4 style={{color:"Navy",fontWeight:"bold"}}>{user.loginId}</h4></Card.Title>
                                    <br></br>
                                    <Card.Text >
                                        <h6>Firstname : {user.firstName}</h6>
                                    </Card.Text>
                                    <Card.Text >
                                        <h6>Lastname : {user.lastName}</h6>
                                    </Card.Text>
                                    <Link to={`/displaytweets/${user.loginId}`} >
                                        <Button color="primary" variant="contained">Get tweet</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    

                
                </>
                )
                })
        
            )}
        </div>
        </div>
        </div>
        </>
    )
}

export default UsersDisplay;