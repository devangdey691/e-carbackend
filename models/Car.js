const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  year: Number,
  fuelType: String,
  transmission: String,
  mileage: String,
  image: String,
  description: String,

  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Car", carSchema);