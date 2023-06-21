import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function Login() {
   let navigate=useNavigate();
   const [enteredCandidate,setCandidate]=useState({
    email:"",
    password:"",
   })
   const handleChange=(event)=>{
    setCandidate({
      ...enteredCandidate,[event.target.name]:event.target.value
    })
   }
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const response=await fetch("http://localhost:5000/api/loginuser",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:enteredCandidate.email,password:enteredCandidate.password})
      })
      const json=await response.json();
      if(json.success){
        localStorage.setItem("authToken",json.authToken);
        navigate("/");
      }
      if(json.success===false){
         alert("Enter Valid Credentials");
      }
    }
  return (
    <>
    <Navbar />
    <div className='container d-flex justify-content-center w-100 mt-5'>
        <form onSubmit={handleSubmit}>
  <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" onChange={handleChange} name="email" value={enteredCandidate.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1"  className="form-label">Password</label>
    <input type="password" onChange={handleChange} autoComplete='off' name="password" value={enteredCandidate.password} className="form-control" />
  </div>
  <button type="submit" className="btn btn-success mx-2">Submit</button>
  <Link to="/createuser" className='btn btn-primary mx-2'>Create Account</Link>
</form>
    </div>
    </>
  )
}
