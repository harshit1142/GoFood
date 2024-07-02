import React, { useEffect } from 'react'
import { useCart, useDispathCart } from './ContextReducer';

export default function Success() {
    let dispatch = useDispathCart();

 
    async function storeOrder(){
       let data = JSON.parse(localStorage.getItem('Lastcart'));
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                Order_date: new Date().toDateString(),
                name: data.name
            })
        });
        localStorage.removeItem('session');
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    useEffect(async ()=> {
        let data = JSON.parse(localStorage.getItem('Lastcart'));
        if (localStorage.getItem('Lastcart')  && data.length>0 && localStorage.getItem('session')){
            storeOrder();
        }
    },[])

  return (
      <div className='container-fluid w-100 vh-100 bg-dark text-white d-flex justify-content-center align-items-center'>
          <div className='d-flex flex-column justify-content-center align-items-center'>
              <h1> Payment Successful !!</h1>
              <a href="/" className='btn btn-outline-success mb-3'>Back To Home</a>
              <a href="/myOrder" className='btn btn-outline-primary'>OrderHistory</a>
          </div>
      </div>
  )
}
