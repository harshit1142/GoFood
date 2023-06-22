const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
CategoryName:String
  }
);

module.exports= mongoose.models.Type || mongoose.model("Type", TypeSchema);