const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
CategoryName:String,
name:String,
img:String,
option:String,
option:Array,
description:String
  }
);

module.exports= mongoose.models.Food_item || mongoose.model("Food_item", FoodSchema);