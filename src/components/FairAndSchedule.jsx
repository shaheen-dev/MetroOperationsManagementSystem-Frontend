import React from 'react'
import '../views/bookTicket.css'
import { useState,useEffect } from 'react';
import ApiService from '../ApiService';
import {  useHistory } from "react-router";

import '../views/MetroImage.css'

// import bookForm from './bookForm'

export function FairAndSchedule() {

  
        const [Source,setSource] = useState(0);
        const [FairResponse, setFairResponse] = useState([]);
        const [ScheduleResponse, setScheduleResponse] = useState([]);

        const [table, SetTable]=useState();
    
       

        let history = useHistory();
        useEffect(() => {

            if(!(localStorage.getItem("user")))
                    history.push("/login");        
          }, []);

        const onchangeHandle = (event) => {
            event.preventDefault();
            setSource(event.target.value);
          
      
        }
      


const handleSchedule= (event) =>{
    
    event.preventDefault();
      
    ApiService.getSchedule(Source)
    .then((response) => {
setScheduleResponse(response.data);


      console.log(response.data);
      
      //history.push('/');
    });
    SetTable(false);
  console.log(Source);
}



        const handleFair = (event) => {
      
            event.preventDefault();
      
          ApiService.getFair(Source)
          .then((response) => {
              console.log(response);
    setFairResponse(response.data);
    
    
            console.log(response.data);
            //history.push('/');
          });
          SetTable(true);
        console.log(Source);
      }
    
    
    
        return (
           <div className="bg-img">
                                        <div className="main">
                                            <form>
                                                <div id='name'>
                                                    <h2 className="name">Station Name </h2>
                                                    <select className="option" name="source" onChange={onchangeHandle} >
                                            <option defaultValue="0">--Choose option--</option>
                                                    <option value = '1' >PCMC</option>
                                                    <option value = '2'> Sant Tukaram Nagar</option>
                                                    <option value = '3'>Bhosari (Nashik Phata)</option>
                                                    <option value = '4'>Kasarwadi</option>
                                                    <option value = '5'>Phugewadi</option>
                                                    <option value = '6'>Dapodi</option>
                                                    <option value = '7'>Bopodi</option>
                                                    <option value = '8'>Khadki</option>
                                                    <option value = '9'>Range Hill</option>
                                                    <option value = '10'>Shivaji Nagar</option>
                                                    <option value = '11'>Civil Court</option>
                                                    <option value = '12'>Budhwar Peth</option>
                                                    <option value = '13'>Mandai</option>
                                                    <option value = '14'>Swargate</option>
                                                    <option value = '15'>Vanaz</option>
                                                    <option value = '16'> Anand Nagar</option>
                                                    <option value = '17'>Ideal Colony</option>
                                                    <option value = '18'>Nal Stop</option>
                                                    <option value = '19'>Garware College</option>
                                                    <option value = '20'>Deccan Gymkhana</option>
                                                    <option value = '21'>Chhatrapati Sambhaji Udyan</option>
                                                    <option value = '22'>PMC</option>
                                                    <option value = '23'>Mangalwar Peth</option>
                                                    <option value = '24'>Pune Railway Station</option>
                                                    <option value = '25'>Ruby Hall Clinic</option>
                                                    <option value = '26'>Bund Garden</option>
                                                    <option value = '27'>Yerawada</option>
                                                    <option value = '28'>Kalyani Nagar</option>
                                                    <option value = '29'>Ramwadi</option>
                                            </select>
                                                    
                                        

                                                </div>
                                                <div className="btn-group d-grid gap-2 mx-auto">
                                                <button className='getFair' onClick={handleFair}>Get Fair</button>
                                            
                                                <button  className='getSchedule' onClick={handleSchedule} >Get Schedule</button>
                                            
                                                </div>
                                            </form>
                                                
                                            
                                        </div>
                                    {table ? <FairTable FairResponse={FairResponse}  />: <ScheduleTable ScheduleResponse={ScheduleResponse} />}
                                        </div>
                                
                            );


                        }

                        const FairTable = (props) =>{
                            return (<div className="t1">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                <table id="customers" className="table text-center">
                        <tr>
                            <th>Destination</th>
                            <th>Fair</th>
                            
                        </tr>
                        {props.FairResponse.map((item) => {
                                return(
                                    <tr key= {item.destination}>
                                        <td>{item.destination}</td>
                                        <td>{item.fair}</td>
                                        
                                    </tr>
                                )
                            })}
                    </table>
                        </div>
                            </div>

                            )
                        }

                        const ScheduleTable = (props) =>{
                            return (<div className="t1">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                <table id="customers" className="table text-center">
                        <tr>
                            <th>Train No</th>
                            <th>Trip No</th>
                            <th>Arrival Time </th>
                            <th>Departure Time</th>
                            <th>Towards</th>
                            
                        </tr>
                        {props.ScheduleResponse.map((item) => {
                                return(
                                    <tr key={item.tripNo}>
                                        <td>{item.trainNo}</td>
                                        <td>{item.tripNo}</td>
                                        <td>{item.arrivalTime}</td>
                                        <td>{item.departureTime}</td>
                                        <td>{item.towards}</td>
                                        
                                    </tr>
                                )
                            })}
                     </table>
                 </div>
          </div>

        )
    }