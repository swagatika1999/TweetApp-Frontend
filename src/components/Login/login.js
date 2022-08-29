import React,{useState} from 'react';
import Card from '../UI/Card/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import {  Link } from "react-router-dom";
import {useNavigate,useParams} from 'react-router-dom';
import image1 from '../../assets/frontImage.jpg';
import swal from'sweetalert';
import axios from 'axios';


const Login=(props)=>{
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    
    const navigate=useNavigate();
   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const requestBody={
            loginId:username,
            password: password
        }
        
        console.log(requestBody);
        try{
         const response=await axios.post('http://localhost:8081/login',requestBody)
         let token=response.data.token;
         let usrname=response.data.loginId;
         localStorage.setItem('usrname',usrname)
         localStorage.setItem('token',token);
         if(token !== null){
            swal("Success","Successfully logged in",{
                buttons:false,
                timer:2000,
            })}
            navigate('/homepage')
         console.log(response);
        }
        catch(e){
            swal("Invalid username or password");
            console.log(e);}
       
        setUserName('');
        setPassword('');
    };
    const usernameHandler=(e)=>{
        setUserName(e.target.value)
       
    }
    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }
    const handleForgotPassword=(e)=>{
        e.preventDefault();
        var wrapper=document.createElement('h1')
        if(username===''){
            swal({
                content:wrapper,
                title:"please enter username",
                buttons:false,
                timer:2000
            })}
            else{
                navigate(`/${username}/ForgotPassword`)
            }
        
    }
    return(
    <section class="vh-100">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6 px-0 d-none d-sm-block">
                <img src={image1} class="w-100 vh-100"  alt="sample image"></img>
            </div>

            <div class="col-sm-6 text-black">
                <div class="p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                    <div class="d-flex align-items-center mb-3 pb-1">
                    <h2 class="h2 fw-bold mb-0">Just Tweet It </h2>
                    </div>
                        <h3 className="h3-text" class="fw-normal mb-3 pb-3">Log in</h3>
                        <div class="form-outline mb-4">
                        <label class="form-label" htmlFor="username">Username</label>
                            <input type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={usernameHandler}
                                    class="form-control form-control-lg" />
                           
                           
                        </div>
                        <div class="form-outline mb-4">
                        <label class="form-label" htmlFor="password">Password</label>
                            <input type="password" 
                                   id="password"
                                   name="password"
                                   value={password}
                                   onChange={passwordHandler}
                                   class="form-control form-control-lg" />
                           

                        </div>
                        <div class="pt-1 mb-4">
                            <button class="btn btn-info btn-lg btn-block" type="submit">Login</button>
                        </div>
                        <div>
                        <p class="small mb-5 pb-lg-2">Forgot Password? <a href="" onClick={(e)=>handleForgotPassword(e)}>forgot password</a></p>
                        </div>
                        <p>Don't have an account? <a href="" onClick={(e)=>navigate("/Register")}>Register here</a></p>
                    </form>
                </div>
            </div>
      </div>
    </div> 
    </section>
    )
}

export default Login;