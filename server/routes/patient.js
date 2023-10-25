const express = require("express");
const router = express.Router();
const { login, signup ,updatePatient} = require("../controllers/Patient");

router.post("/login", login);
router.post("/signup", signup);
router.post("/updatePatient", updatePatient);
module.exports = router;
