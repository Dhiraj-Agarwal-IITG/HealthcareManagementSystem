// Importing necessary modules and packages
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
	origin: '*',
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
const adminRoutes = require("./routes/admin");
const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");
const database = require("./config/db");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());

app.use("/api/v1/auth/admin", adminRoutes);
app.use("/api/v1/auth/patient", patientRoutes);
app.use("/api/v1/auth/doctor", doctorRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});