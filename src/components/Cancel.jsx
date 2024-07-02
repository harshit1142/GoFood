import React from 'react'

export default function Cancel() {
    localStorage.removeItem('session');
  return (
    <div className='container-fluid w-100 vh-100 bg-dark text-white d-flex justify-content-center align-items-center'>
          <div className='d-flex flex-column justify-content-center align-items-center'>
              <h1>402 : Payment Failed</h1>
              <a href="/" className='btn btn-outline-success'>Back To Home</a>
       </div>
    </div>
  )
}
