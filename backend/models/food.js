const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
{
    name:String,
    CategoryName:String,
    img:String,
    Option:Array,
    description:String
}
);

module.exports= mongoose.models.Type || mongoose.model("Food_item", FoodSchema);