const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor")
const Appointment = require("../models/appointment")
const mongoose = require("mongoose");
const Patient = require("../models/patient");
const sendMail = require("../utils/sendMail");
const rescheduleTemplate = require("../mail/rescheduleEmail");
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
        { firstname: user.firstname, lastname: user.lastname, email: user.email, id: user._id, role: "doctor" },
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
      doctorId = "",
      address = "",
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
    const id = req.query.id;
    const doctorDetails = await Doctor.findById(id);
    res.status(200).json({
      success: true,
      message: "Doctor data fetched successfully",
      data: doctorDetails,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const doctorDetails = await Doctor.find();
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

exports.fetchByDept = async (req, res) => {
  try {
    const department = req.query.department;
    const doctorDetails = await Doctor.find({ department });
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
    const Doctordetails = await Doctor.findById(id);
    if (!Doctordetails) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    await Doctor.findByIdAndDelete(id);
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

exports.scheduleLeave = async (req, res) => {
  try {
    // Get all required fields from request body
    const { doctorId, startTime, endTime } = req.body;
    if (
      !doctorId ||
      !startTime ||
      !endTime
    ) {
      return res.status(200).json({
        success: false,
        message: 'All Fields are required',
      });
    }

    const session = await mongoose.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };

    let updatedDoctor;

    try {
      await session.withTransaction(async () => {

        // add leave to doctor schedule
        updatedDoctor = await Doctor.findOneAndUpdate(
          { _id: doctorId },
          {
            $push: {
              "leaveSchedule": {
                startTime, endTime
              }
            }
          },
          { new: true }
        );

        // cancel all appointments in this time period
        const allAppointments = await Appointment.find({ doctor: doctorId });

        await Promise.all(allAppointments.map(async (data) => {

          let startHour = 0, endHour = 0;
          if (data.slot === "slot8to10") {
            startHour = 8;
            endHour = 10;
          }
          else if (data.slot === "slot10to12") {
            startHour = 10;
            endHour = 12;
          }
          else if (data.slot === "slot12to2") {
            startHour = 12;
            endHour = 14;
          }
          else if (data.slot === "slot2to4") {
            startHour = 14;
            endHour = 16;
          }
          else if (data.slot === "slot4to6") {
            startHour = 16;
            endHour = 18;
          }
          else if (data.slot === "slot6to8") {
            startHour = 18;
            endHour = 20;
          }
          const appointmentTime = new Date(data.dateOfAppointment)?.setHours(startHour, 0);
          if (startTime <= appointmentTime && appointmentTime < endTime) {
            await Appointment.findOneAndUpdate(
              { _id: data._id },
              {
                status: "Pending",
                doctor: null,
              },
              { new: true }
            );

            // assign new doctor
            let assignedDoctor = [];
            const doctorDetails = await Doctor.find({ department: updatedDoctor.department });
            const ids = doctorDetails.map(doc => {
              const leaveArr = doc.leaveSchedule;
              let isAvailable = true;
              leaveArr.forEach(leave => {
                if (leave.startTime <= appointmentTime && appointmentTime < leave.endTime) {
                  isAvailable = false;
                }
              })
              if (isAvailable) {
                return doc._id
              }
            });

            await Promise.all(ids.map(async (doctorId) => {
              const appointments = await Appointment.find({ doctor: doctorId, dateOfAppointment: data.dateOfAppointment.toISOString().substring(0, 10), status: "Approved" });
              let count = 0;
              appointments.forEach(el => {
                if (el.slot === data.slot)
                  count++;
              })
              if (count < 4) {
                assignedDoctor.push({ count, doctorId });
              }
            }));


            if (assignedDoctor.length === 0) {
              try {
                const patient = await Patient.findById(data.patient);
                const emailID = patient.email;
                try {
                  const mailResponse = await sendMail(
                    emailID,
                    "Reschedule appointment",
                    rescheduleTemplate()
                  );
                  console.log("Email sent successfully: ", mailResponse.response);
                } catch (error) {
                  console.log("Cannot send email to patient: ", patient);
                  console.log("Error: ", error.message);
                }
                // send email to patient
              } catch (error) {
                console.log("Error occurred while sending email: ", error);
                console.log("Error: ", error.message);
              }
              return;
            }

            const doctor = assignedDoctor.sort((a, b) => a.count - b.count)[0].doctorId;

            const updatedAppointment = await Appointment.findOneAndUpdate(
              { _id: data._id },
              {
                doctor,
                status: "Approved",
              },
              { new: true }
            );
            console.log("Rescheduled: ", updatedAppointment._id);
            // console.log(updatedAppointment);
          }
        }));

      }, transactionOptions);

      res.status(200).json({
        success: true,
        data: updatedDoctor,
        message: 'Leave scheduled successfully',
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to schedule leave',
        error: error.message,
      });
    } finally {
      await session.endSession();
    }


  } catch (error) {
    // Handle any errors that occur during the creation of the doctor
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule leave',
      error: error.message,
    });
  }
};