import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState([])

    const fetchMyOrder = async () => {
        await fetch("http://localhost:5000/api/myOrder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            setorderData(response?.orderData || [])
        }).catch(error => {
            console.log(error);
        })
    }


    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {Array(orderData).length > 0 ? Array(orderData).map((data, index) => (
                        data.order_data ?
                            data.order_data.slice(0).reverse().map((item, idx) => (
                                <React.Fragment key={`${index}-${idx}`}>
                                       { item.map((arrayData, arrayIndex) => (
                                        <>
                                               {arrayData?.Order_date?.length>0 ?
                                            < div className = 'col-12' key = {`${index}-${idx}-${arrayIndex}`}>
                                                <div className='m-auto mt-5 text-white'>
                                                     {arrayData.Order_date}
                                                   <hr/>
                                                   </div>
                                               </div> :
                                                   <div div className='col-12 col-md-6 col-lg-3' key={`${index}-${idx}-${arrayIndex}`}>
                                    <div className="card mt-3" style={{ width: "20rem", maxHeight: "360px" }}>
                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{arrayData.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{arrayData.qty}</span>
                                                <span className='m-1'>{arrayData.size}</span>
                                                <span className='m-1'>{data.Order_date}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{arrayData.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                               }
                                
                                    </>
                            ))
                                        
                                    }
                </React.Fragment>
                )) : <h1 key={index}>No  Order!!</h1>
                )) : <h1>No Order !!</h1>}
            </div>
        </div>
        </div >
    )
}