import React from "react";
import '../views/Header2.css'

import { useHistory } from "react-router";
// import {MetroLogo} from '../views/MetroLogo.jpg'

export function Header2() {
let history = new useHistory();
const gotoLogin=(event)=>{
    event.preventDefault();
    history.push("/login")
}

    return (
        <div className="headerContainer">     
            <div className="header">
                
                <div className="header-right">
                   
                    <ul className="inline ulClass">
                    <li className="liClass"><a className=" btn btn-secondary" href="/admin">Home</a></li>
                    <li className="liClass"><a className="btn btn-secondary" href="/replyToComplaints">Complaints</a></li>
                    <li className="liClass"><a className="btn btn-secondary" href="/issueCards">MetroCards</a></li>
                    <li className="liClass"><a className="btn btn-secondary" href="/logout">Logout</a></li>
                    </ul>

                </div>
            </div>
        </div>
        )
}