const mongoose = require("mongoose");

// Define the Profile schema
const adminSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Admin", adminSchema);
