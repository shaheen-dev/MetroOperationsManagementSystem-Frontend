import React from "react";
import ApiService from "../../ApiService";
import { useState } from "react";
import { useHistory } from "react-router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export function Register() {
  const [Name,setName] = useState('');
  const [Address,setAddress] = useState('');
  const [Email,setEmail] = useState('');
  const [Phone,setPhone] = useState('');
  const [Dob,setDob] = useState('');
  const [Gender,setGender] = useState('');
  const [Password,setPassword] = useState('');
  //const [Password1,setPassword1] = useState('');
  //const [ConfirmPassword,setConfirmPassword] = useState('');





  let history = useHistory();
  const MySwal = withReactContent(Swal);
  var msg ;

  const handleOnChange = (event) => {

    if (event.target.name === "password") 
       setPassword(event.target.value);
    
    else if (event.target.name === "name")
    {
      if(event.target.value > 10)
         msg = "Please fill upto 10 characters"
      else
        setName(event.target.value)
    }
    else if (event.target.name === "address")
      setAddress(event.target.value)
    else if (event.target.name === "phone")
      setPhone(event.target.value)
    else if (event.target.name === "dob")
      setDob(event.target.value)
    else if (event.target.name === "gender")
      setGender(event.target.value)
    else if (event.target.name === "email")
      setEmail(event.target.value)



  }

  const handleRegisterRequest = (event) => {

   
      event.preventDefault();
      if(Email==='' || Password==='' || Address==='' || Phone==='' || Gender==='' ){
      MySwal.fire(
        'Oops!',
        'Please fill all the form fields!!',
        'question'
      )
      }
     else{
     
    

  
    var signUpRequest = {
      name: Name,
      email: Email,
      address: Address,
      phone: Phone,
      dob: Dob,
      gender: Gender,
      password: Password
    }
    console.log(signUpRequest);
    ApiService.SignUp(signUpRequest).then((response) => {
      console.log(response.data);
      MySwal.fire(
        'Congratulations!',
        'You have successfully registered with us!!!',
        
      ).then(()=>{history.go(0);})
      
    }).catch((err)=>
    {
      console.log(err.data);
      MySwal.fire(
        'Oops!',
        'User Already Registered with us!',
        'question'
      ).then(()=>{
        history.go(0);
      })
    })
  }
}

  return (
    <div className="base-container" >
      
      <div className="content">

        <div className="form">
          <div className="form-group">
            <span>{msg}</span>
            <input type="text" name="name" placeholder="Name" maxLength="25"  rules={{ maxLength: 20, required: true, min: 3 }} onChange={handleOnChange} />
          </div>
          <div className="form-group">

            <input type="text" name="address" placeholder="Address" maxLength="100" required onChange={handleOnChange} />
          </div>
          <div className="form-group">

            <input type="text" name="phone" placeholder="Phone" maxLength="10" required onChange={handleOnChange} />
          </div>
          <div className="form-group">

            <input type="date" name="dob" placeholder="DOB" required onChange={handleOnChange} />
          </div>
          <div className="form-group">

            <input type="email" name="email" placeholder="email" maxLength="25" required onChange={handleOnChange} />
          </div>
          <div className="form-group">

            <input type="password" name="password" placeholder="password" minLength="4" maxLength="8" required onChange={handleOnChange} />
          </div>
          
          <div className="form-group">
            <select name="gender" onChange={handleOnChange}>
              <option disabled="disabled" selected="selected">--Choose option--</option>
              <option value="male">Male </option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="footer register">
        <button type="submit" className="btn btn-dark" onClick={handleRegisterRequest}><font color="white">
        Register
        </font>
          
        </button>
      </div>
        </div>
      </div>
      
    </div>
  );

}
