const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Doctor=require("../models/doctor")
require("dotenv").config();


exports.signup = async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        mobile,
        email,
        password,
        confirmPassword,
        doctorId,
        address,
      } = req.body
  
      if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !confirmPassword ||
        !mobile ||
        !doctorId ||
        !address
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }
  
      const existingUser = await Doctor.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Doctor account already exists with this email. Please sign in to continue.",
        })
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await Doctor.create({
        firstname,
        lastname,
        email,
        mobile,
        doctorId,
        address,
        password: hashedPassword,
      })
  
      return res.status(200).json({
        success: true,
        user,
        message: "Doctor created successfully",
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Doctor account cannot be created. Please try again.",
      })
    }
  }
  
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      const user = await Doctor.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `Doctor is not registered.`,
        })
      }
  
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          message: `Doctor Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `Login Failure. Please Try Again`,
      })
    }
  }

exports.updateDoctor = async (req, res) => {
  try {
    const {
      firstname = "",
      lastname = "",
      email = "",
      mobile = "",
      doctorId="",
      address="",
      id
    } = req.body

    // Find the profile by id
    // const DoctorDetails = await Doctor.findById(id)

    const doctor = await Doctor.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      mobile,
      doctorId,
      address
    })
    await doctor.save();



    const DoctorDetails = await Doctor.findById(id)

    return res.json({
      success: true,
      message: "Profile updated successfully",
      DoctorDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}


exports.getDoctorDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const doctorDetails = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Doctor data fetched successfully",
      data: doctorDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.deleteDoctorDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const Doctordetails = await Doctor.findById(id );
    if (!Doctordetails) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    await Doctor.findByIdAndDelete(id );
    res.status(200).json({
      success: true,
      message: "Doctor data deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    // Get all required fields from request body
    const {
      doctorId,
      firstname,
      lastname,
      mobile,
      address,
      email,
      password
    } = req.body;

    // Check if any of the required fields are missing
    if (
      !doctorId ||
      !firstname ||
      !lastname ||
      !mobile ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are Mandatory',
      });
    }

    // Create a new doctor with the given details
    const newDoctor = await Doctor.create({
      doctorId,
      firstname,
      lastname,
      mobile,
      address,
      email,
      password
    });

    // Return the new doctor and a success message
    res.status(200).json({
      success: true,
      data: newDoctor,
      message: 'Doctor Created Successfully',
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the doctor
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Doctor',
      error: error.message,
    });
  }
};