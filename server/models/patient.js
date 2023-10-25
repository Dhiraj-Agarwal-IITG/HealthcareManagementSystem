const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
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
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  mobile: {
    type: Number,
    trim: true,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
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


module.exports = mongoose.model("Patient", patientSchema);
