import React,{ useState, useEffect }  from 'react'
import '../views/complaint.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ApiService from '../ApiService';
import { useHistory } from "react-router";
import createHistory from 'history/createBrowserHistory'
import "bootstrap/dist/css/bootstrap.min.css";
import MetroImage from './admin/MetroImage';
import '../views/MetroImage.css'

// import bookForm from './bookForm'

export function Complaints() {
    const [Table, setTable] = useState(true);
    const [Data, setComplaints] = useState([]);
    const [Form, setForm] = useState(false);
    // var Data = [];
    let history = useHistory();
    const history1 = createHistory();
    useEffect(() => {
      

        if(!(localStorage.getItem("user")))
                history.push("/login");

      
      let loggedInUser = {email:localStorage.getItem("user")}
        ApiService.fetchAllComplaints(loggedInUser).
        then( (response) => {
             setComplaints(response.data)
           console.log(response);
                 } )
      }, []);

    const handleClick = () => {
         const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Complaint Registration Form',
            html: 
            `<input type="text" id="name" class="swal2-input" placeholder="Name">
            <input type="email" id="email" class="swal2-input" placeholder="Email">
                        <input type="text" id="address" class="swal2-input" placeholder="Address">
            <input type="number" id="phone" class="swal2-input" placeholder="Phone">
            <input type="textarea" id="msg" class="swal2-input" placeholder="Message">`,
            confirmButtonText: 'Register',
            focusConfirm: false,
            preConfirm: () => {
              const name = Swal.getPopup().querySelector('#name').value
              const email = Swal.getPopup().querySelector('#email').value
              const phone = Swal.getPopup().querySelector('#phone').value
              const address = Swal.getPopup().querySelector('#address').value
              const msg = Swal.getPopup().querySelector('#msg').value
              if (!name || !email ||!address ||!phone ||!msg) {
                Swal.showValidationMessage(`Please fill all the form fields to submit complaint!`)
              }
             return { name:name, email: email,phone:phone,address:address,msg:msg }
              
            }
          }).then((result) => {
           let complaint = result.value;
           if(!complaint.name || !complaint.email ||!complaint.address ||!complaint.phone ||!complaint.msg)
                history1.go(0);
                else{
           ApiService.registerComplaint(complaint)
           .then((response) => {
             console.log(response.data);
                history.go(0);
           });
          }
          }).catch(()=>{
            history1.go(0);
          })
    }
    
    return (
        <div className='empty bg-img'>
          <MetroImage />
            {Data.length === 0 ? <p>no complaints here</p> : null}
            {Table ? <div>
          
              <div className="d-grid gap-2 col-6 mx-auto tableDiv">
            <table id="customers" className="css-serial table text-center">
                    <tr >
                        <th>Sr No</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Response</th>
                    </tr>
                    {Data.map((item) => {
                            return(
                                <tr key= {item.id}>
                                    <td>&nbsp;</td>
                                    <td>{item.dateTime}</td>
                                    <td>{item.msg}</td>
                                    {item.status ?<td> Resolved </td>: <td> Pending </td>}
                                    <td>{item.response}</td>
                                </tr>
                            )
                        })}
                </table>
                </div>
            </div> : null}
            <div>
            <div className="d-grid gap-2 col-2 mx-auto raisebtn">
        <button
          type="submit"
          className="btn btn-secondary btn-lg "
          onClick={handleClick}
        >
          Raise complaint
        </button>
      </div>
      </div>
    </div>
    );
    
  }

 
