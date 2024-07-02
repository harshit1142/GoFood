import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispathCart } from './ContextReducer';

export default function Card(props) {

  let dispath = useDispathCart();
  let data = useCart();

  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    await dispath({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img })
  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("Lastcart") !== null) {
      dispath({ type: "Update", data: JSON.parse(localStorage.getItem('Lastcart')) });
    }
  }, [])

  return (
    <div className="d-flex flex-row mt-3">
      <div className="card" style={{ margin: "3px" }} >
        <img src={props.foodItem.img} style={{ height: "300px", objectFit: "fill", overflow: "hidden" }} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text"></p>
          <div className='container w-100'>
            <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1} >{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className='d-inline h-100 fs-5'>
              {finalPrice}/-
            </div>
          </div>
          <hr />
          <button className='btn btn-success justigy-center ms-2' onClick={handleAddToCart}>ADD TO CART</button>
        </div>
      </div>
    </div>
  )
}
