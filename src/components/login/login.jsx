import React from "react";
import loginImg from "../../login.svg";
import { useState } from 'react';
import ApiService from '../../ApiService';
import { useHistory } from "react-router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


export function Login() {
  const [Email,setEmail] = useState('');
  const [Password,setPassword] = useState('');
  const [user, setUser] = useState();

let history = useHistory();
const MySwal = withReactContent(Swal);

  const onchangeHandle = (event) => {
    if (event.target.name === "email")
      setEmail(event.target.value);
    else
      setPassword(event.target.value);

  }


  const handleLogin = async (event) => {
    event.preventDefault();
    if(Email==='' || Password===''){
    MySwal.fire(
      'Oops!',
      'Credentials Required!!',
      'question'
    )
    }
   else{
    if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(Email)) { 
      var LoginRequest = {
        email: Email,
        password: Password
  
      }
                                      console.log(LoginRequest);
                                      if(Email==='metrorailservice@gmail.com'){
                                        ApiService.AdminLogin(LoginRequest).then((response) => {
                                          setUser(response.data)
                                          localStorage.setItem('user', response.data.email)
                                          console.log(response.data);
                                          history.push('/admin');
                                        }).catch((err)=>{
                                      console.log(err.data)
                                          MySwal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text:'Invalid credentials..!',
                                          
                                          })
                                        });
                                      }
                                else{
                                      ApiService.Login(LoginRequest)
                                        .then((response) => {
                                          setUser(response.data)
                                          localStorage.setItem('user', response.data.email)
                                          console.log(response.data);
                                          history.push('/bookTicket');
                                        }).catch((err)=>{
                                      console.log(err.data)
                                          MySwal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text:'Invalid credentials..!',
                                          
                                          })
                                        });
                                        
                                    }
                                  }
     else
     {
     MySwal.fire(
      'Oops!',
      'credentials Required!!',
      'question'
    )
     }
    }
  }




  return (
    <div className="base-container" >
      
      

      <div className="head"><font size="5">Login</font></div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="inputClass">
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="email" name="email" placeholder="username" onChange={onchangeHandle}  required= "true"  />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" onChange={onchangeHandle} required />
          </div>
          </div>
          
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn btn-dark" onClick={handleLogin}><font color="white">
        Login
        </font>
         
        </button>
      </div>
    </div>
  );
}

