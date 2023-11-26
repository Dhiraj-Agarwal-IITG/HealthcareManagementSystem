const mongoose = require("mongoose");

// Define the Profile schema
const doctorSchema = new mongoose.Schema({
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
  department: {
    type: String,
    enum: ["Cardiology", "ENT", "General", "Gynaecology", "Haematology", "Neurology", "Oncology", "Opthalmology", "Orthopaedic", "Pediatrics", "Psychiatry", "Urology"],
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  leaveSchedule: [
    {
      startTime: { type: Number },
      endTime: { type: Number }
    }
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
