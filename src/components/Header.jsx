import React from "react";


import { useHistory } from "react-router";
// import {MetroLogo} from '../views/MetroLogo.jpg'

export function Header() {
let history = new useHistory();
const gotoLogin=(event)=>{
    event.preventDefault();
    history.push("/login")
}
const gotoHome=(event)=>{
    event.preventDefault();
    history.push("/")
}

    return (
        <div className="headerContainer">     
            <div className="header">
            <div className="header-right">
                   
                   <button className="btn btn-dark btn-lg btn1" onClick={gotoHome}><font color="white">Home</font></button>
                   
               </div>
                <div className="header-right">
                   
                    <button className="btn btn-dark btn-lg btn1" onClick={gotoLogin}><font color="white">Login</font></button>
                    
                </div>
            </div>
        </div>
        )
}