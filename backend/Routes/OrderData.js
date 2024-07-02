const express = require("express");
const router = express.Router();
const Order=require("../models/Order");
const { useState } = require("react");
const stripe = require("stripe")("sk_test_51PY4lKRpg92mkcsJYyxTfv9HbauNzx2B08PV8cp84xBVjzesklKJQE92mMCzJhkJe436nCowp2Rsa0c0U1wmSa8f00gmtOiSC0")

router.post("/create-checkout-session",async(req,res)=>{
    const {products}=req.body;
    const productsData=products.map((product)=>({
          price_data:{
            currency: "inr",
            product_data: {
                name: product.name,
                images: [product.img]
          },
          unit_amount:product.price*100,
        },
        quantity:product.qty
            }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:productsData,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });
   
    res.json({id:session.id}) 

})

router.post("/orderData",async(req,res)=>{


   let data=req.body.order_data;
   await data.splice(0,0,{Order_date:req.body.Order_date})
   let eId=await Order.findOne({'email':req.body.email})
   console.log(eId);
   if(eId ===null )
   {
       try {
          await Order.create({
            name:req.body.name,
            email:req.body.email,
            order_data:[data]
          }).then(()=>{
            res.send({success:true})
          })
       } catch (error) {
        console.log(error);
       }
   }
   else{
    try {
        await Order.findOneAndUpdate({email:req.body.email},
            { $push:{order_data:data}}).then(()=>{
                res.json({success:true})
            })
    } catch (error) {
        res.send("Server error",error.message);
        console.log(error);
    }
   }
})

router.post("/myOrder",async(req,res)=>{

     try {
        let myData=await Order.findOne({"email":req.body.email});
            res.json({orderData:myData});
        console.log(myData);
     } catch (error) {
         console.log(error+"ads");
      res.send(error);
     }
})
module.exports = router;