import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import Card from '../components/Card'

export default function Home() {
  
  const [search,setSearch]=useState('');
  const [FoodItem,setFoodItem]=useState([]);
  const [FoodCat,setFoodCat]=useState([]);

  const loadData=async()=>{
    let response=await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'content-Type':'application/json'
      }
    });
    response=await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
    loadData()
  },[])



  return (
    <div>
        <Navbar />
        <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousel" style={{objectFit:"contain !important"}}>
  <div className='carousel-caption ' style={{zIndex:"10"}}>
  <form class=" d-flex  "  role="search">
        <input class="form-control me-2 ms-3" type="search" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900x700?Chaat"  style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700?curry" style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700?dosa" style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>

 
     
</div>
     
    </div>
        <div className='container'>
          {
             FoodCat !==[]
             ? FoodCat.map((data)=>{
               return (
                <div className="row">
                <div key={data._id} className='fs-3 m-3'>
                   {data.CategoryName }
                </div>
                <hr />
               {FoodItem.filter((items)=>(items.CategoryName === data.CategoryName)&&(items.name.toLowerCase().includes(search.toLowerCase())))
               .map(filterItems=>{
                 return (
                  <div className='col-12 col-md-6 col-lg-3 m-3'>
                    <Card 
                    foodName={filterItems.name}
                    options={filterItems.options[0]}
                    imgsrc={filterItems.img}

                    />
                  </div>
                 );
               })}
                </div>
               
             )}):""
                
                }
          
        </div>
    
    </div>
  )
}
