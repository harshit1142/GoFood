const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const food = require("../backend/models/food");
const type = require("../backend/models/type");


const mongoose_url = process.env.Mongoose_URL;
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoose_url, { useNewUrlParser: true });
    console.log("DB CONNECTED");
    try {
      const data = await food.find({}).exec();
      global.food_items = data;
      const Category = await type.find({}).exec();
      global.food_category = Category;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoDB;