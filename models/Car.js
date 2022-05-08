const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
 createdBy: {     
   type: mongoose.Schema.Types.ObjectId, ref:"users",    
   required: true,
   },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Car = mongoose.model("cars", CarSchema);

module.exports = Car;