const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      email,
      password,
      confirmPassword,
    } = req.body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile
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

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Admin account already exists with this email. Please sign in to continue.",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Admin.create({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
    })

    return res.status(200).json({
      success: true,
      user,
      message: "Admin created successfully",
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Admin account cannot be created. Please try again.",
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

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `Admin is not registered.`,
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
        message: `Admin Login Success`,
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