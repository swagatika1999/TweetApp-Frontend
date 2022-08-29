import React,{useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import image1 from '../../assets/registrationpage.jpg';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import swal from'sweetalert';
import './Registration.css';
const Registration=()=>{
    
    const[isSubmit,setIsSubmit]=useState(false);
    const[userinput,setUserinput]=useState({
        loginId:'',
        firstName:'',
        lastName:'',
        email:'',
        contactNumber:'',
        password:'',
        confirmPassword:''
    });

    const [error,setError]=useState({
        loginId:'',
        firstName:'',
        lastName:'',
        email:'',
        contactNumber:'',
        password:'',
        confirmPassword:''
    })

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const requestBody={
            loginId:userinput.loginId,
            firstName:userinput.firstName,
            lastName:userinput.lastName,
            email:userinput.email,
            contactNumber:userinput.contactNumber,
            password:userinput.password,
            confirmPassword:userinput.confirmPassword
        }
       
        setIsSubmit(true);
        
        try{
         const response=await axios.post('http://localhost:8081/register',requestBody)
         console.log(response);
         if(Object.keys(userinput).length!==0 && isSubmit){
            swal("Success","Successfully registered",{
                buttons:false,
                timer:2000,
            })
            }
           
            
        }
        catch(e){
           
           swal("User with username or email already exists or fields are blank",{
                buttons:false,
                timer:2000,});
            console.log(e);}
       
       
    };

    
 
    const onInputchange = (e) =>{
       
        const{name,value}=e.target;
        setUserinput(prev=>({
            ...prev,
            [name]: value
        }));
        validateInput(e);
        
    }
    const validateInput=(e)=>{
       
        let{name,value}= e.target;
        let isValid=true;
        setError(prev=>{
            const stateObj={...prev,[name]:""};
            
            switch(name){
                case "loginId":
                    if(!value){
                        stateObj[name]="please enter your preferred loginId";
                    }
                    break;
                case "firstName":
                    if(!value){
                        stateObj[name]="please enter your firstname";
                    }
                    break;
                case "lastName":
                    if(!value){
                        stateObj[name]="please enter your lastname";
                    }
                    break;
                case "email":
                    if(!value){
                        stateObj[name]="please enter your mail id";
                    }else if( !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value))){
                        stateObj[name]="please enter valid email id";
                    }
                    break;
                case "password":
                    if(!value){
                        stateObj[name]="please enter the password";
                    }else if(userinput.confirmPassword && value!== userinput.confirmPassword){
                        stateObj["confirmPassword"]="Password and Confirm Password doen not match";
                    }else{
                        stateObj["confirmPassword"]=userinput.confirmPassword?"":error.confirmPassword;
                    }
                    break;
                case "contactNumber":
                    if(!value){
                        stateObj[name]="please enter your contact number";
                    }else if((typeof value !== "undefined")){
                        var pattern = new RegExp(/^[0-9\b]+$/);
                        if (!pattern.test(value)) {
                            isValid = false;
                            stateObj[name] = "Please enter only number.";
                            }else if(value.length != 10){
                                isValid = false;
                                stateObj[name] = "Please enter valid 10 digit phone number.";

                            }
                    }
                    break;
                case "confirmPassword":
                    if(!value){
                        stateObj[name]="please enter confirm password";
                    }else if(userinput.password && value!==userinput.password){
                        stateObj[name]="password and confirm password does not match";
                    }
                    break;
                default:
                    break;
            }
            return stateObj;
        });
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
                    <h2 class="h2 fw-bold mb-0">Registration </h2>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                            <label class="form-label" htmlFor="firstName">Firstname</label>
                            <input type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={userinput.firstName}
                                    onChange={onInputchange}
                                    onBlur={validateInput}
                                    placeholder="Firstname"
                                    class="form-control" />
                                    {error.firstName && <span className='err'>{error.firstName}</span>}
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                            <label class="form-label" htmlFor="lastName">Lastname</label>
                            <input type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={userinput.lastName}
                                    onChange={onInputchange}
                                    onBlur={validateInput}
                                    placeholder="Lastname"
                                    class="form-control" />
                                    {error.lastName && <span className='err'>{error.lastName}</span>}
                            </div>
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                            <label class="form-label" htmlFor="email">Email</label>
                            <input type="text"
                                    id="email"
                                    name="email"
                                    value={userinput.email}
                                    onChange={onInputchange}
                                    onBlur={validateInput}
                                    placeholder="xyz@mail.com"
                                    class="form-control" />
                                    {error.email && <span className='err'>{error.email}</span>}
                           
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                            <label class="form-label" htmlFor="contactNumber">Contact number</label>
                            <input type="number"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={userinput.contactNumber}
                                    onChange={onInputchange}
                                    onBlur={validateInput}
                                    placeholder="contact number"
                                    class="form-control" />
                                    {error.contactNumber && <span className='err'>{error.contactNumber}</span>}
                            </div>
                        </div> 
                    </div>
                    <div class="form-outline mb-4">
                    <label class="form-label" htmlFor="loginId">Username</label>
                            <input type="text"
                                    id="loginId"
                                    name="loginId"
                                    value={userinput.loginId}
                                    onChange={onInputchange}
                                    onBlur={validateInput}
                                    placeholder="xyz123"
                                    class="form-control form-control-lg" />
                                    {error.loginId && <span className='err'>{error.loginId}</span>}
                           
                        </div>
                        <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                            <label class="form-label" htmlFor="password">Password</label>
                            <input type="password"
                                    id="password"
                                    name="password"
                                    value={userinput.password}
                                    onChange={onInputchange}
                                    onBlur={validateInput}
                                    placeholder="Password"
                                    class="form-control" />
                                    {error.password && <span className='err'>{error.password}</span>}
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="form-outline">
                            <label class="form-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={userinput.confirmPassword}
                                    onChange={onInputchange}
                                    onBlur={validateInput}
                                    placeholder="repeat your password"
                                    class="form-control" />
                                    {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                            
                            </div>
                        </div> 
                    </div>
                    <Button color="primary" variant="contained" type="submit">Register</Button>
                    <div>
                    <p>Return to login page <a href="/" class="link-info">Login here</a></p>
                    </div>
                    
                    </form>
                </div>
                </div>
          </div>
        </div> 
        </section>
        )
}

export default Registration;