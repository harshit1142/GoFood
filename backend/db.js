const mongoose=require("mongoose");
const dotenv=require("dotenv");
const { Result } = require("express-validator");
dotenv.config();

const food=require("../backend/models/food");
const type=require("../backend/models/type");


const mongoose_url=process.env.Mongoose_URL;
const mongoDB=async()=>{
    try {
     await mongoose.connect(mongoose_url, { useNewUrlParser: true });
     console.log("DB CONNECTED");
    //  try {
    //      const fetched_data= await mongoose.connection.db.collection("food_items");
    //     fetched_data.find({}).toArray(function(err,data){  
    //     if(err){
    //         console.log(err);
    //       }
    //       console.log(data);
    //     })
    //  } catch (error) {
    //    console.log(error);
    //  }
    try {
      const data=await food.find({}).exec();
      global.food_items=data;
      const Category=await type.find({}).exec();
      global.food_category=Category;
    } catch (error) {
      console.log(error);
    }
    } catch (error) {
      console.log(error);
    }
}

module.exports =mongoDB;