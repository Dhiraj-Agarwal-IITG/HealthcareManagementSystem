const express = require("express");
const router = express.Router();
const { login, signup,updateDoctor, deleteDoctorDetails} = require("../controllers/Doctor");

router.post("/login", login);
router.post("/signup", signup);
router.post("/updateDoctor", updateDoctor);
router.delete("/deleteDoctor", deleteDoctorDetails);

module.exports = router;
