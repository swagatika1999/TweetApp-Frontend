import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import image1 from '../../assets/forgotPassword1.jpg';
import Button from '@material-ui/core/Button';
import SelectInput from "@material-ui/core/Select/SelectInput";
import './ForgotPassword.css';
import swal from'sweetalert';


const ForgotPassword=()=>{
    
    const username=localStorage.getItem('usrname');
    const[pwdword,setPwdword]=useState({
        password:'',
        confirmPassword:''
    });

    const [error,setError]=useState({
        password:'',
        confirmPassword:''
    })

    const onPasswordChange = (e) =>{
       
        const{name,value}=e.target;
        setPwdword(prev=>({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }
    const validateInput=(e)=>{
       
        let{name,value}=e.target;
        setError(prev=>{
            const stateObj={...prev,[name]:""};
            switch(name){
                case "password":
                    if(!value){
                        stateObj[name]="please enter the password";
                    }else if(pwdword.confirmPassword && value!== pwdword.confirmPassword){
                        stateObj["confirmPassword"]="Password and Confirm Password doen not match";
                    }else{
                        stateObj["confirmPassword"]=pwdword.confirmPassword?"":error.confirmPassword;
                    }
                    break;
                case "confirmPassword":
                    if(!value){
                        stateObj[name]="please enter confirm password";
                    }else if(pwdword.password && value!==pwdword.password){
                        stateObj[name]="password and confirm password does not match";
                    }
                    break;
                default:
                    break;
            }
            return stateObj;
        });
    }

    const getPassword=async(e)=>{
        e.preventDefault()
        const reqBody={
            password:pwdword.password,
            confirmPassword:pwdword.confirmPassword
        }
        try{
            const res=await axios.put(`http://localhost:8081/${username}/forgot`,reqBody)
            console.log(res);
            swal("Success","Password updated Successfully",{
                buttons:false,
                timer:2000})

        }catch(error){console.log(error)}
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
                    <form onSubmit={getPassword}>
                    <div class="d-flex align-items-center mb-3 pb-1">
                    <h2 class="h2 fw-bold mb-0">Forgot Password? Don't worry change now. </h2>
                    </div>
                        
                        <div class="form-outline mb-4">
                        <label class="form-label" htmlFor="password">Password</label>
                            <input type="password"
                                    id="password"
                                    name="password"
                                    value={pwdword.password}
                                    onChange={onPasswordChange}
                                    onBlur={validateInput}
                                    class="form-control form-control-lg" />
                                    {error.password && <span className='err'>{error.password}</span>}
                           
                           
                        </div>
                        <div class="form-outline mb-4">
                        <label class="form-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={pwdword.confirmPassword}
                                    onChange={onPasswordChange}
                                    onBlur={validateInput}
                                    class="form-control form-control-lg" />
                                    {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                           

                        </div>
                        <div class="pt-1 mb-4">
                            <button class="btn btn-info btn-lg btn-block" type="submit">Update password</button>
                        </div>
                        
                        <p>Back to login page <a href="/" class="link-info">Login here</a></p>
                    </form>
                </div>
            </div>
      </div>
    </div> 
    </section>
        )
}

export default ForgotPassword;