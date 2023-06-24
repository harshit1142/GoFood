const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }

})

module.exports=mongoose.model('order',OrderSchema);
