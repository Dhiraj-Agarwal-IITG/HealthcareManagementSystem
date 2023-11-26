const mongoose = require("mongoose");

// Define the Profile schema
const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient",
  },
  symptoms: {
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
    default: "Approved",
  },
  slot: {
    type: String,
    enum: ["slot8to10", "slot10to12", "slot12to2", "slot2to4", "slot4to6", "slot6to8"],
    required: true,
  },
  dateOfAppointment: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    enum: ["Cardiology", "ENT", "General", "Gynaecology", "Haematology", "Neurology", "Oncology", "Opthalmology", "Orthopaedic", "Pediatrics", "Psychiatry", "Urology"],
    require: true,
  }
},
  { timestamps: true }
);
module.exports = mongoose.model("Appointment", appointmentSchema);
