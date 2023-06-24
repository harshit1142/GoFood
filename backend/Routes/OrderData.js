const express = require("express");
const router = express.Router();
const Order=require("../models/Order");
const { useState } = require("react");


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
        
     } catch (error) {
      res.send(error);
     }
})
module.exports = router;