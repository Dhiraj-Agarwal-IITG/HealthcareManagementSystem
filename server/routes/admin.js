const express = require("express");
const router = express.Router();
const { login, signup, getAdminDetails,updateAdmin, deleteAdminDetails } = require("../controllers/Admin");

router.post("/login", login);
router.post("/signup", signup);
router.post("/update", updateAdmin);
router.get("/fetch", getAdminDetails);
router.delete("/delete", deleteAdminDetails);

module.exports = router;
