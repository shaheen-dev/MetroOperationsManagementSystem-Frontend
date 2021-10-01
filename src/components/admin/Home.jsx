import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../views/admin.css'
import ApiService from '../../ApiService';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import {Header2} from '.././Header2'
import '../../views/Header.css'
// import '../../views/MetroImage.css'

export default function Home() {

    const [DataSet,setData]= useState('');

    let history = new useHistory();
   // var Data;
    useEffect(() => {
        
       // if(!(localStorage.getItem("admin")))
                //history.push("/login");
    
                ApiService.fetchAdminData().then((response)=>{
                    console.log(response.data);
                   
                    //Data=response.data;
                setData(response.data);
                })
      }, []);
    //console.log(Data)
    //setData(Data);
    console.log(DataSet.totalTickets)
    const totalTickets = DataSet.totalTickets;
    const totalRecharge = DataSet.totalRecharge;
    const totalCards = DataSet.totalCards;
    const totalPendingCards = DataSet.totalPendingCards;
    const totalComplaints = DataSet.totalComplaints;
    const pendingComplaints = DataSet.pendingComplaints;


    
  return (
    <div className="bg-Colour">
              <Header2 />
             
      <div class="row cards">
       <div class="col-sm">
       <div class="card text-white bg-dark mb-3">
       <div class="card-header text-center textHead"><font size="6">Total Tickets</font></div>
       <div class="card-body text-center textBody">
           <h5 class="card-title"><font size="6">{totalTickets}</font></h5>
          
       </div>
       </div>
       </div>
       <div class="col-sm">
       <div class="card text-white bg-secondary mb-3">
       <div class="card-header text-center textHead"><font size="6">Card Recharge</font></div>
       <div class="card-body text-center textBody">
           <h5 class="card-title"><font size="6">{totalRecharge}</font></h5>
          
       </div>
       </div>
       </div>
       <div class="col-sm">
       <div class="card text-white bg-dark mb-3">
       <div class="card-header text-center textHead"><font size="6">Total Cards</font></div>
       <div class="card-body text-center textBody">
           <h5 class="card-title"><font size="6">{totalCards}</font></h5>
          
       </div>
       </div>
       </div>
   </div>

   <div class="row cards">
       <div class="col-sm">
       <div class="card text-white bg-secondary mb-3">
       <div class="card-header text-center textHead"><font size="6">Complaints</font></div>
       <div class="card-body text-center textBody">
           <h5 class="card-title"><font size="6">{totalComplaints}</font></h5>
          
       </div>
       </div>
       </div>
       <div class="col-sm">
       <div class="card text-white bg-dark mb-3">
       <div class="card-header text-center textHead"><font size="6">Pending Complaints</font></div>
       <div class="card-body text-center textBody">
           <h5 class="card-title"><font size="6">{pendingComplaints}</font></h5>
          
       </div>
       </div>
       </div>
       <div class="col-sm">
       <div class="card text-white bg-secondary mb-3">
       <div class="card-header text-center textHead"><font size="6">Pending Card Request</font></div>
       <div class="card-body text-center textBody">
           <h5 class="card-title"><font size="6">{totalPendingCards}</font></h5>
          
       </div>
       </div>
       </div>
   </div>
    </div>
  )
}
