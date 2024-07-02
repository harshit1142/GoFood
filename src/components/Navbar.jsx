import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const data=useCart();
  const navigate=useNavigate();
  
  const [viewCart,setViewCart]=useState(false);
  function handleLogout(){
    localStorage.removeItem("authToken");
    navigate("/");
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 text-success"  to="/">GoFood</Link>
    <button className="navbar-toggler bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link  fs-5 mt-3" aria-current="page" style={{color:"White"}} to="/">Home</Link>
        </li>
        {localStorage.getItem("authToken")?
        <li className="nav-item">
          <Link className="nav-link fs-5 mt-3 btn btn-primary " style={{color:"White"}} to="/myOrder">My Orders</Link>
        </li>
        :""}
       
       
      </ul>
      {!localStorage.getItem("authToken")?
      <div className='d-flex'>
    
          <Link className="nav-link fs-5 btn btn-secondary mx-2 mt-3" style={{color:"White"}} to="/login">Login</Link>
          <Link className="nav-link fs-5 btn btn-secondary mx-2 mt-3" style={{color:"White"}} to="/createuser">SignUp</Link>

      </div>
      :
      <div className='d-flex'>
        <div className='nav-link fs-5 btn btn-success  text-white mx-2 mt-3' onClick={()=>setViewCart(true)}>
        My Cart <span class="badge badge-white  bg-danger">{data.length}</span>
         </div>
        {viewCart?<Model onClose={()=>setViewCart(false)}><Cart /></Model>:null}
        <div className='nav-link fs-5 btn btn-danger text-white mx-2 mt-3' onClick={handleLogout}>Logout</div>
      </div>
      }
      
    </div>
  </div>
</nav>
    </div>
  )
}
