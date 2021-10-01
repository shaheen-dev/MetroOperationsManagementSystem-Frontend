import React, { useEffect, useState } from 'react'
import './AdminComplaint.css'
import ApiService from '../../ApiService';
import createHistory  from 'history/createBrowserHistory'
import { Header2 } from '../Header2';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export function AdminIssueCard(){
    const [Data, setIssueCard] = useState([]);
    const MySwal = withReactContent(Swal);
    let history =  createHistory();

    useEffect(() => {
        ApiService.fetchAllCardsForIssueAdmin().
        then( (response) => {
             setIssueCard(response.data)
           console.log(response);
        } )
        
      }, []);

    
    const handleClick = (event) => {
        var id = event.target.id;
        console.log(id);

        ApiService.issueCardByAdmin(id)
           .then((response) => {
             console.log(response.data);
             MySwal.fire({
                title: <strong>Card Issued succesfully!</strong>,
               
                icon: 'success'
              }).then(()=>{
                history.go(0)
              })
               

           });

    }

    return(
        <div className='complaintContainer'>
            <Header2 />
           <br /><br />
            <div className="d-grid gap-2 col-6 mx-auto">
            <table id="customers" className="table text-center">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    {Data.map((item) => {
                            return(
                                <tr key= {item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.user.name}</td>
                                    <td>{item.user.email}</td>
                                    {item.status ?<td> Issued </td>: <td> Pending </td>}
                                    {item.status ?<td> Issued</td>:<td onClick={handleClick} id={item.id} ><button className='replyButton btn btn-dark' id={item.id}>Issue Now</button></td>}
                                    
                                </tr>
                            )
                        })}
                </table>
                </div>
        </div>
    )
}