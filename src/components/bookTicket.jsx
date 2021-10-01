import React, { useEffect } from 'react'
import { useState } from 'react';
import '../views/bookTicket.css'
import ApiService from '../ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import { useHistory } from 'react-router';
import MetroImage from './admin/MetroImage';

export function BookTicket () {
    const MySwal = withReactContent(Swal);
    const history = useHistory();

   
    useEffect(() => {

        if(!(localStorage.getItem("user")))
                history.push("/login");

      }, []);



    const [bookRequest, setBookRequest] = useState({
        sourceId : '0',
        destinationId: '0',
        quantity: 1,
        journeyType: 'false'
    })
    const [Fair, setFair] = useState(0);   
    
    const afterHandle = () => {
        console.log(bookRequest);
     
        ApiService.bookRequest(bookRequest)
            .then((response) => {
                setFair(response.data.fair);
            }).catch((err)=>{
                console.log(err.data);
            })
    }
    
    useEffect(afterHandle,[bookRequest]);
     const handleFair = (event) => {
        const {value, name} = event.target;

        setBookRequest((preValue) => {
            if(name === "Source"){
                return  {
                    sourceId : value,
                    destinationId: preValue.destinationId,
                    quantity: preValue.quantity,
                    journeyType: preValue.journeyType
                }

            }else if(name === "Destination"){
                return  {
                    sourceId : preValue.sourceId,
                    destinationId: value,
                    quantity: preValue.quantity,
                    journeyType: preValue.journeyType
                }
            }else if(name === "quantity"){
                return  {
                    sourceId : preValue.sourceId,
                    destinationId: preValue.destinationId,
                    quantity: value,
                    journeyType: preValue.journeyType
                }
            }else if(name === "Journey"){
                return  {
                    sourceId : preValue.sourceId,
                    destinationId: preValue.destinationId,
                    quantity: preValue.quantity,
                    journeyType: value
                }
            }
        })



}


const paymentStart = (event) =>{
    event.preventDefault();
    if(bookRequest.destinationId==='0' || bookRequest.sourceId==='0')
    {
        MySwal.fire({
            title: <strong>Oops!</strong>,
            html: <i>Please select Source and Destination to Book ticket!
            </i>,
            icon: 'question'
          })
    }else{


    console.log("payment Initiated....");
    var transaction ={
        transactionType:'',
        payment_id:'',
        source:'',
        destination:'',
        amt:'',
        status:'',
        email:''
    }
    var amount = Fair;
    transaction.amt=Fair;
    console.log(amount);

    var data = {
        amount:amount,
        info:'order_request',
        source:bookRequest.sourceId,
        destination:bookRequest.destinationId,
    };
   
    transaction.source=data.source;
    transaction.destination=data.destination;
    transaction.email=localStorage.getItem("user");
    transaction.transactionType='Ticket Booking';
    console.log(data);
ApiService.CreateOrderRequest(data)
.then((res) => {
    let response=res.data;
    //console.log(JSON.stringify(response))
//var response=response.data.modelJson.map;
    if(response.status==='created')
    {
        var options = {

            key: "rzp_test_zhjmZId0SjXCfp",
        
            amount: response.amount, 
        
            currency: "INR",
        
            name: "Pune Metro",
        
            description: "Metro Ticket Transaction",
        
           // "image": "logo",
        
            order_id: response.id, 
        
            handler: function (response){
        
                //console.log("in handler"+JSON.stringify(response))
                console.log(response.razorpay_payment_id);
        
                console.log(response.razorpay_order_id);
        
                console.log(response.razorpay_signature)
                
                MySwal.fire({
                    title: <strong>Ticket Booked!</strong>,
                    html: <i>Please check 
                        your email for your ticket!
                    </i>,
                    icon: 'success'
                  })

                
                transaction.payment_id=response.razorpay_payment_id;
                
                transaction.status='Success';
                
                console.log(transaction);
                ApiService.SaveTransactionDetails(transaction);
            },
        
            prefill: {
        
                "name": "Pune Metro",
        
                "email": "metrorail@gmail.com",
        
                "contact": "7798112855"
        
            },
        
            notes: {
        
                Developed_By: "Shaheen & Team!"
        
            },
        
            theme: {
        
                "color": "#3399cc"
        
            }
        
        };
        
        var rzp1 = new window.Razorpay(options);
        
        //document.getElementById('rzp-button1').onclick = function(e){
        
            rzp1.open();
        
            //e.preventDefault();
       // }


    rzp1.on("payment.failed",function (response){
        
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
       
        alert("payment failed!!");
        transaction.payment_id=response.error.metadata.payment_id;
        transaction.status='Failed';
        ApiService.SaveTransactionDetails(transaction);
    })}

}).catch((err)=>{
    console.error("in err "+err.response.data);
    //err.response.data => DTO on the server side : ErrorResponse
    //console.log(err.response.data.message);       
})



    }
   
}
    return (
        <div className='empty bg-img'>
            <MetroImage />
            <div className='gap'>     
                <div className="regform">
                    <h3 className="">Book Ticket</h3>
                </div>
                <div className="main">
                    <form className="bg-dark">
                        <div id='name'>
                        <h2 class="name">Source </h2>
                        {/* <input class="firstname" type="text" name="first_name" o/><br/> */}
                        <select className="option" name="Source" id="selctedSource" onChange={handleFair} >
                                <option disabled="disabled" selected="selected">--Choose option--</option>
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
                        <h2 class="name">Destination </h2>
                        <select className="option" name="Destination" id="selctedDestination" onChange={handleFair} required>
                        <option selected="selected">--Choose option--</option>
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
                        {/* <input class="firstname" type="text" name="company" /> */}
                        <h2 class="name">Quantity </h2>
                        <input class="firstname" type="number" name="quantity" onChange={handleFair} />
                        <h2 class="name">Journey Type</h2>
                        <select class="option" name="Journey" onChange={handleFair} >
                                <option selected="selected">--Choose option--</option>
                                <option value = "false">One way </option>
                                <option value = "true">Return</option>
                        </select>
                        <div className="fair">
                       
                        <font size="6"
                        face="verdana"
                        color="white">
                            <p>Fair :&nbsp;&nbsp; {Fair}</p>
                        
                        </font>
                       
                        </div>
                       
                       
                        <div className="d-grid gap-2 col-2 mx-auto ">
                            <button
                            type="submit"
                            className="btn btn-secondary btn-lg h1Tag"
                            onClick={paymentStart}
                            >
                            Book Now
                            </button>
                        </div>
                    </form>
                    
                    </div>
            
                </div>
        </div>
    );
    
  }

  