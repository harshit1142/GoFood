import React from 'react'

export default function Card(props) {

   let options=props.options;
   let priceOptions=Object.keys(options);

  return (
    <div className="d-flex flex-row mt-3">
        <div className="card" style={{margin:"3px"}} >
  <img src={props.imgsrc} style={{width:"300px" ,height:"300px"}} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.foodName}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <div className='container w-100'>
      <select className='m-2 h-100  bg-success rounded'>
        {Array.from(Array(6),(e,i)=>{
          return (
            <option key={i+1} value={i+1} >{i+1}</option>
          )
        })}
      </select>
      <select className='m-2 h-100  bg-success rounded'>
         {priceOptions.map((data)=>{
          return <option key={data} value={data}>{data}</option>
         })}
      </select>
      <div className='d-inline h-100 fs-5'>
        Total Price
      </div>

    </div>
  </div>
</div>
    </div>
  )
}
