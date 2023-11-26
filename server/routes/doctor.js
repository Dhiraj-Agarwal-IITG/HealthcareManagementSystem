const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  updateDoctor,
  deleteDoctorDetails,
  fetchAll,
  fetchByDept,
  scheduleLeave,
  getDoctorDetails
} = require("../controllers/Doctor");

router.post("/login", login);
router.post("/signup", signup);
router.post("/update", updateDoctor);
router.delete("/delete", deleteDoctorDetails);
router.get("/fetchAll", fetchAll);
router.get("/fetchByDept", fetchByDept);
router.get("/getById", getDoctorDetails);
router.post("/scheduleLeave", scheduleLeave);

module.exports = router;
