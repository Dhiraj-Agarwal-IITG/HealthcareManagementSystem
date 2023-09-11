const mongoose = require("mongoose");

// Define the Profile schema
const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: string,
    require: true,
  },
  firstname: {
    type: String,
    trim: true,
    require: true,
  },
  lastname: {
    type: String,
    trim: true,
    require: true,
  },
  mobile: {
    type: Number,
    trim: true,
  },
  address: {
    type: String,
  },

  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
