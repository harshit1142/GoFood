import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 text-success"  to="/">GoFood</Link>
    <button className="navbar-toggler bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link  fs-5 mt-3" aria-current="page" style={{color:"White"}} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-5 mt-3" style={{color:"White"}} to="/menu">Menu</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-5 mt-3" style={{color:"White"}} to="/aboutus">About Us</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-5 btn btn-secondary mx-2 mt-3" style={{color:"White"}} to="/login">Login</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link fs-5 btn btn-secondary mx-2 mt-3" style={{color:"White"}} to="/createuser">SignUp</Link>
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}
