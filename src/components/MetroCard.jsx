import React from "react";
import Swal from "sweetalert2";
import ApiService from "../ApiService";
import withReactContent from "sweetalert2-react-content";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import createHistory from 'history/createBrowserHistory'
import { useHistory } from "react-router";
import './metrocard.css'
import '../views/MetroImage.css'

export default function MetroCard() {
  const [CardNo, setCardNo] = useState(0);
  const [Balance, setBalance] = useState(0);


var RechargeObj;
var Amount;

  const history = createHistory();
  const history1= useHistory();
  
  useEffect(() => {

    
    if(!(localStorage.getItem("user")))
    history1.push("/login");


    let loggedInUser = {email:localStorage.getItem("user")}
    console.log(loggedInUser)
    ApiService.fetCardDetails(loggedInUser)
      .then((response) => {
        setCardNo(response.data.cardNo);
        setBalance(response.data.balance);
        console.log(response.data);
      })
     
  }, []);

  const handleRegisterCard = () => {
    const MySwal = withReactContent(Swal);
    

    MySwal.fire({
      title: "Metro Card Request",
      html: `
            <input type="text" id="iCardNo" class="swal2-input" placeholder="Identity Card No">
            <input type="number" id="pin" class="swal2-input" placeholder="Pin">
            `,
      confirmButtonText: "Request for card",
      focusConfirm: false,
      preConfirm: () => {
        const iCardNo = Swal.getPopup().querySelector("#iCardNo").value;
        const pin = Swal.getPopup().querySelector("#pin").value;
        const loggedInUser = localStorage.getItem("user");
        //const { value: file } = Swal.getPopup().querySelector('#file').value

        if (!iCardNo || !pin) {
          Swal.showValidationMessage(`Please fill all the form fields!`);
        }
        //console.log();
        return { iCardNo: iCardNo, pin: pin,user:loggedInUser };
      },
    }).then((result) => {
     // var card = {iCardNo:result.value.iCardNo,pin:result.value.pin,user:result.value.user}
      //console.log(card);
      ApiService.requestMetroCard(result.value).then((response) => {
        console.log(response.data);
        MySwal.fire(
          "success",
          "Card Request Successfully Submitted!\n Admin will Approve your Card Request shortly!",
          "success"
        ).then(()=>{
              history.go(0);
        });

        //alert(response.data)
      }).catch((err)=>{
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Can\'t proceed your request',
          
        })
      })
    }).catch(()=>{
      history.go(0);
    })
  };



  const paymentStart = (Amount) => {
    //event.preventDefault();
    const MySwal = withReactContent(Swal);
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
    let amount = Amount;
    console.log(amount);

    var data = {
      amount: amount,
      info: "order_request",
    };
    transaction.email=localStorage.getItem("user");
    transaction.transactionType='Card Recharge';
    transaction.amt=Amount;
    console.log(data);
    ApiService.CreateOrderRequest(data)
      .then((response) => {
        
        let resp = response.data;
        if (resp.status === "created") {
          var options = {
            key: "rzp_test_zhjmZId0SjXCfp",

            amount: resp.amount,

            currency: "INR",

            name: "Pune Metro",

            description: "Metro Ticket Transaction",

            // "image": "logo",

            order_id: resp.id,

            handler: function (response) {
            
            transaction.payment_id=response.razorpay_payment_id;
            
            transaction.status='Success';
            ApiService.rechargeMetroCard(RechargeObj)
            .then((response) => {
              console.log(response.data);
            }).then(()=>{

              MySwal.fire({
                title:"success",
                text:"Recharge Successfully Done!",
                type:"success"
              }).then(()=>{
                    history.go(0);
              });
            })
            ApiService.SaveTransactionDetails(transaction);  
            },

            prefill: {
              name: "Pune Metro",

              email: "metrorail@gmail.com",

              contact: "7798112855",
            },

            notes: {
              Developed_By: "Shaheen & Team!",
            },

            theme: {
              color: "#3399cc",
            },
          };

          var rzp1 = new window.Razorpay(options);

          //document.getElementById('rzp-button1').onclick = function(e){

          rzp1.open();

          //e.preventDefault();
          // }

          rzp1.on("payment.failed", function (response) {
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
          });
        }
      })
      
  };

  const handleRechargeCard = (event) => {
    event.preventDefault();
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Card Recharge",
      html: `
          <input type="text" id="cardNo" class="swal2-input" placeholder="MetroCard No">
          <input type="number" id="pin" class="swal2-input" placeholder="Pin">
          <input type="number" id="amount" class="swal2-input" placeholder="amount">
          `,
      confirmButtonText: "Recharge",
      focusConfirm: false,
      preConfirm: () => {
        const cardNo = Swal.getPopup().querySelector("#cardNo").value;
        const pin = Swal.getPopup().querySelector("#pin").value;
        const amount = Swal.getPopup().querySelector("#amount").value;
        //const { value: file } = Swal.getPopup().querySelector('#file').value

        if (!cardNo || !pin || !amount) {
          Swal.showValidationMessage(`Please fill all the form fields!`);
        }
        //console.log();
        return { cardNo: cardNo, pin: pin, amount: amount };
      },
    }).then((result) => {
      RechargeObj=result.value;
      Amount=result.value.amount;
      ApiService.AuthenticateMetroCard(RechargeObj)
      .then((response)=>{ 
        paymentStart(Amount);
      }).catch((err)=>{
               
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text:'Inavlid credentials..!',
         
        })
      });
    }).catch((err)=>{
      history.go(0);
      console.log(err.data);
    })
  };

  return (
    <div className="metro bg-img">
      <div className="d-grid gap-2 col-6 mx-auto">
        <table className="table table-secondary text-center  ">
          <thead>
            <tr>
              <th colSpan="2">Your Card Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Card No</td>
              <td>{CardNo}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{Balance}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          type="submit"
          className="btn btn-secondary btn-lg "
          onClick={handleRegisterCard}
        >
          Request for Card
        </button>
        <button
          type="submit"
          className="btn btn-secondary btn-lg"
          onClick={handleRechargeCard}
        >
          Recharge Card
        </button>
      </div>
    </div>
  );
}
