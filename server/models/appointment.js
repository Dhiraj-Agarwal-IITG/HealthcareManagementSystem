const mongoose = require("mongoose");

// Define the Profile schema
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient",
  },
  Reason: {
    type: String,
    required: true,
  },
  token_no: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled", "Closed"],
    default: "Pending",
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);
module.exports = mongoose.model("Appointment", appointmentSchema);
