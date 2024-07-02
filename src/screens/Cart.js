import React, { useEffect } from 'react'
import { useCart, useDispathCart } from '../components/ContextReducer';
import { loadStripe } from '@stripe/stripe-js';


export default function Cart() {
  let data = useCart();
  let dispatch = useDispathCart();
 async function handleCheckOut(){
  

   const stripe = await loadStripe('pk_test_51PY4lKRpg92mkcsJkY02HuqqpQxOuw9RCItMhcfUtVa8Zal8pM0OEII4RRfOKPUx5KhrmG7VnLd7yy3zVDcUgqLP00raIdsCLy');

  const body={
    products:data,
    email: localStorage.getItem("userEmail"),
    Order_date: new Date().toDateString(),
    order_data: data,
  }
  const header={
    "Content-Type":"application/json"
  }
   const response=await fetch("http://localhost:5000/api/create-checkout-session",{
    method:"POST",
    headers:header,
    body:JSON.stringify(body)
   })
   const session=await response.json();
   const result=stripe.redirectToCheckout({
    sessionId:session.id
   })
   console.log(result);
   if (result.error) {
     console.log(result.error);
     return;
   }
    //  let userEmail=localStorage.getItem("userEmail");
    //  let response=await fetch("http://localhost:5000/api/orderData",{
    //     method:"POST",
    //     headers:{
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({
    //       order_data:data,
    //       email:userEmail,
    //       Order_date:new Date().toDateString(),
    //       name:data.name
    //     })
    //  });
    //  if(response.status===200){
    //   dispatch({type:"DROP"})
    //  }
   
  }

  useEffect(()=>{
    if (localStorage.getItem("Lastcart")!==null){
      dispatch({ type: "Update", data: JSON.parse(localStorage.getItem('Lastcart'))});
    }
  },[])

console.log(data);

  if (data.length==0 ) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data!==null && data.map((food, index) => (
              <tr className='text-white'>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0 text-warning" onClick={()=>{dispatch({type:"REMOVE",index})}}>CANCEL</button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}