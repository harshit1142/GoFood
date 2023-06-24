import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

export default function Signup() {
  let navigate=useNavigate();
   const [candidate,setCandidate]=useState({
    name:"",
    email:"",
    password:"",
    location:""
   })
   const handleChange=(event)=>{
    setCandidate({
      ...candidate,[event.target.name]:event.target.value
    })
   }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/createuser",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name:candidate.name,email:candidate.email,password:candidate.password,location:candidate.location})
        })
        const json=await response.json();
        if(json.success){
          localStorage.setItem("userEmail",candidate.email);
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
    <label htmlFor="name" className="form-label text-white">Name</label>
    <input type="text" onChange={handleChange} className="form-control" name="name" value={candidate.name}  />
    </div>
  <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
    <input type="email" onChange={handleChange} name="email" value={candidate.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1"  className="form-label text-white">Password</label>
    <input type="password" onChange={handleChange} autoComplete='off' name="password" value={candidate.password} className="form-control" />
  </div>
  <div className="mb-3 ">
    <label htmlFor="name" className="form-label text-white">Address</label>
    <input type="text" className="form-control" onChange={handleChange} name="location" value={candidate.location} />
    </div>
  <button type="submit" className="btn btn-success mx-2">Submit</button>
  <Link to="/login" className='btn btn-primary mx-2'>Already a Account</Link>
</form>
    </div>
    </>
  )
}
