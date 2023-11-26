const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
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
    } = req.body

    if (
      !firstname ||
      !lastname ||
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
      firstname,
      lastname,
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
        { firstname: user.firstname, lastname: user.lastname, email: user.email, id: user._id, role: "admin" },
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

exports.updateAdmin = async (req, res) => {
  try {
    const {
      firstname = "",
      lastname = "",
      email = "",
      mobile = "",
      id
    } = req.body

    const admin = await Admin.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      mobile
    })
    await admin.save()
    const AdminDetails = await Admin.findById(id)
    return res.json({
      success: true,
      message: "Profile updated successfully",
      AdminDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.getAdminDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const adminDetails = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Admin data fetched successfully",
      data: adminDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.deleteAdminDetails = async (req, res) => {
  try {
    const id = req.body;
    const AdminId = await Admin.findById(id);
    if (!AdminId) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      })
    }
    await Admin.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Admin data deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    // Get all required fields from request body
    const {
      firstname,
      lastname,
      mobile,
      email,
      password
    } = req.body;

    // Check if any of the required fields are missing
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are Mandatory',
      });
    }

    // Create a new admin with the given details
    const newAdmin = await Admin.create({
      firstname,
      lastname,
      mobile,
      email,
      password
    });

    // Return the new admin and a success message
    res.status(200).json({
      success: true,
      data: newAdmin,
      message: 'Admin Created Successfully',
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the admin
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Admin',
      error: error.message,
    });
  }
};
