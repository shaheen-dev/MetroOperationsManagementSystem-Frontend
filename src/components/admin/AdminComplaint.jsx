import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './AdminComplaint.css' 
import createHistory  from 'history/createBrowserHistory'
import { Header2 } from "../Header2";

export function AdminComplaints () {
    const [Data, setComplaints] = useState([]);

    let history =  createHistory();

    useEffect(() => {
        ApiService.fetchAllComplaintsAdmin().
        then( (response) => {
let sortedData= response.data;
  sortedData.sort((a, b) => {
                  if (a.status < b.status) {
                    return -1;
                  }
                  if (a.status > b.status) {
                    return 1;
                  }
                  return 0;
                });             
          setComplaints(sortedData)
           console.log(sortedData);
        } )
        
      }, []);


      const handleClick = (id) => {
        //setForm(true);

        const MySwal = withReactContent(Swal)
        //var id = event.target.id;
console.log(id)

        MySwal.fire({
            title: 'Response to Complaint',
            html: 
            `<input type="text" id="response" class="swal2-input" placeholder="Give Response">`,
            confirmButtonText: 'Send Response',
            focusConfirm: false,
            preConfirm: () => {
              const response = Swal.getPopup().querySelector('#response').value
              
              if (!response ) {
                Swal.showValidationMessage(`Please fill all the form fields to submit complaint!`)
              }
              //console.log();
              return { msgString:response }
              
            }
          }).then((result) => {
           let Response = result.value;
           console.log(Response);
           //console.log(event.target.id);
           ApiService.replyToComplaint(id,Response)
           .then((response) => {
             console.log(response.data);
                history.go(0)
           });
            
          })
          

          
    }
    


    return (
        <div className='complaintContainer'>
          <Header2 />
            <br />
            <br />
            <div className="d-grid gap-2 col-6 mx-auto">
            <table id="customers" className="table text-center">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Complaint</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    {Data.map((item) => {
                            return(
                                <tr key= {item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.msg}</td>
                                    {item.status ?<td> Resolved </td>: <td> Pending </td>}
                                    {item.status ?<td> Replied</td>:<td onClick={()=>handleClick(item.id)}><button className='btn btn-dark adminComplaintBtn'>Give Reply</button></td>}
                                    
                                </tr>
                            )
                        })}
                </table>
                </div>
        </div>
    )
}