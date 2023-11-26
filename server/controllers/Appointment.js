const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const mongoose = require("mongoose");
require("dotenv").config();

exports.createAppointment = async (req, res) => {
  try {
    const { patient, department, slot, symptoms, dateOfAppointment } = req.body;

    if (!patient || !department || !slot || !symptoms || !dateOfAppointment) {
      return res.status(200).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const session = await mongoose.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };
    let appointment;

    try {
      await session.withTransaction(async () => {

        let assignedDoctor = [];
        try {
          const doctorDetails = await Doctor.find({ department });

          let startHour = 0, endHour = 0;
          if (slot === "slot8to10") {
            startHour = 8;
            endHour = 10;
          }
          else if (slot === "slot10to12") {
            startHour = 10;
            endHour = 12;
          }
          else if (slot === "slot12to2") {
            startHour = 12;
            endHour = 14;
          }
          else if (slot === "slot2to4") {
            startHour = 14;
            endHour = 16;
          }
          else if (slot === "slot4to6") {
            startHour = 16;
            endHour = 18;
          }
          else if (slot === "slot6to8") {
            startHour = 18;
            endHour = 20;
          }
          const appointmentTime = new Date(dateOfAppointment)?.setHours(startHour, 0);

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
            const appointments = await Appointment.find({ doctor: doctorId, dateOfAppointment, status: "Approved" });
            let count = 0;
            appointments.forEach(data => {
              if (data.slot === slot)
                count++;
            })
            if (count < 4) {
              assignedDoctor.push({ count, doctorId });
            }
          }));
        }
        catch (error) {
          console.error(error.message);
          return res.status(500).json({
            success: false,
            message: "Appointment cannot be created. Please try again.",
          });
        }

        if (assignedDoctor.length === 0) {
          return res.status(200).json({
            success: false,
            message: "No slots left. Please book a different slot",
          });
        }
        else {
          const token_no = await Appointment.find({}).count();
          const doctor = assignedDoctor.sort((a, b) => a.count - b.count)[0].doctorId;

          appointment = await Appointment.create({
            patient,
            doctor,
            symptoms,
            slot,
            token_no,
            dateOfAppointment,
            department,
            status: "Approved",
          });
          return res.status(200).json({
            success: true,
            data: appointment,
            message: "Appointment created successfully",
          });
        }
      }, transactionOptions);



    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Appointment cannot be created. Please try again.",
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Appointment cannot be created. Please try again.",
    });
  }
};

exports.getAppointmentDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const appointmentDetails = await Appointment.findById(id).populate("patient").exec();
    res.status(200).json({
      success: true,
      message: "Appointment data fetched successfully",
      data: appointmentDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAppointmentsByPatientId = async (req, res) => {
  try {
    const patient = req.query.id;
    const appointmentDetails = await Appointment.find({ patient }).populate("patient").populate("doctor").exec();
    res.status(200).json({
      success: true,
      message: "Appointment data fetched successfully",
      data: appointmentDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctor = req.query.id;
    const appointmentDetails = await Appointment.find({ doctor })
      .populate("patient")
      .populate("doctor")
      .exec();
    res.status(200).json({
      success: true,
      message: "Appointment data fetched successfully",
      data: appointmentDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointmentDetails = await Appointment.find().populate("patient").exec();
    res.status(200).json({
      success: true,
      message: "Appointment data fetched successfully",
      data: appointmentDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.checkIfAlreadyBooked = async (req, res) => {
  try {
    const { patient, department, slot, dateOfAppointment } = req.body;

    if (!patient || !department || !slot || !dateOfAppointment) {
      return res.status(200).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const appointmentDetails = await Appointment.find({ patient, department, status: "Approved" });
    if (appointmentDetails.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Checked successfully",
        data: false
      });
    }

    const sameSlotAppointments = await Appointment.find({ patient, slot, dateOfAppointment, status: "Approved" });
    if (sameSlotAppointments.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Checked successfully",
        data: false
      });
    }
    else {
      return res.status(200).send({
        success: true,
        message: "Checked successfully",
        data: true
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to process request. Please try again.",
    });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const { slot, dateOfAppointment, department, id } = req.body;
    console.log(req.body);
    if (!slot || !dateOfAppointment || !department || !id) {
      return res.status(200).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const session = await mongoose.startSession();
    const transactionOptions = {
      readPreference: "primary",
      readConcern: { level: "local" },
      writeConcern: { w: "majority" },
    };
    let appointment;

    try {
      await session.withTransaction(async () => {
        let assignedDoctor = [];
        try {
          const doctorDetails = await Doctor.find({ department });

          let startHour = 0,
            endHour = 0;
          if (slot === "slot8to10") {
            startHour = 8;
            endHour = 10;
          } else if (slot === "slot10to12") {
            startHour = 10;
            endHour = 12;
          } else if (slot === "slot12to2") {
            startHour = 12;
            endHour = 14;
          } else if (slot === "slot2to4") {
            startHour = 14;
            endHour = 16;
          } else if (slot === "slot4to6") {
            startHour = 16;
            endHour = 18;
          } else if (slot === "slot6to8") {
            startHour = 18;
            endHour = 20;
          }
          const appointmentTime = new Date(dateOfAppointment)?.setHours(
            startHour,
            0
          );

          const ids = doctorDetails.map((doc) => {
            const leaveArr = doc.leaveSchedule;
            let isAvailable = true;
            leaveArr.forEach((leave) => {
              if (
                leave.startTime <= appointmentTime &&
                appointmentTime < leave.endTime
              ) {
                isAvailable = false;
              }
            });
            if (isAvailable) {
              return doc._id;
            }
          });

          await Promise.all(
            ids.map(async (doctorId) => {
              const appointments = await Appointment.find({
                doctor: doctorId,
                dateOfAppointment,
                status: "Approved",
              });
              let count = 0;
              appointments.forEach((data) => {
                if (data.slot === slot) count++;
              });
              if (count < 4) {
                assignedDoctor.push({ count, doctorId });
              }
            })
          );
        } catch (error) {
          console.error(error.message);
          return res.status(500).json({
            success: false,
            message: "Appointment cannot be created. Please try again.",
          });
        }

        if (assignedDoctor.length === 0) {
          return res.status(200).json({
            success: false,
            message: "No slots left. Please book a different slot",
          });
        } else {
          const doctor = assignedDoctor.sort((a, b) => a.count - b.count)[0]
            .doctorId;

          appointment = await Appointment.findOneAndUpdate({ _id: id }, {
            doctor,
            slot,
            dateOfAppointment,
            status: "Approved",
          });
          return res.status(200).json({
            success: true,
            data: appointment,
            message: "Appointment rescheduled successfully",
          });
        }
      }, transactionOptions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Appointment cannot be rescheduled. Please try again.",
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Appointment cannot be created. Please try again.",
    });
  }
};