const express = require("express");
const router = express.Router();
const { login, signup, getAdminDetails,updateAdmin, deleteAdminDetails } = require("../controllers/Admin");

router.post("/login", login);
router.post("/signup", signup);
router.post("/updateAdmin", updateAdmin);
router.get("/fetchAdmin", getAdminDetails);
router.delete("/deleteAdmin", deleteAdminDetails);

module.exports = router;
