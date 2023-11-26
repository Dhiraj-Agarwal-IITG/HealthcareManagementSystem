const express = require("express");
const router = express.Router();
const { login, signup ,updatePatient, sendOtp,  getPatientDetails,
} = require("../controllers/Patient");

router.post("/login", login);
router.post("/signup", signup);
// router.post("/update", updatePatient);
// router.get("/fetchPatients", getAllPatients);
router.get("/getById", getPatientDetails);
router.post("/sendOtp",sendOtp);
router.put("/updatePatient",updatePatient);
module.exports = router;
