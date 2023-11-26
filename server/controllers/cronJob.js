const cron = require("node-cron");
const Appointment = require("../models/appointment");

const itemsCronJob = () => {
    // Setting up cron job to update status of appointments
    cron.schedule("0 * * * *", async () => {
        console.log("---------------------");
        console.log("running a task every 1 hour");
        console.log(Date.now());
        try {
            const appointmentDetails = await Appointment.find();
            await Promise.all(appointmentDetails.map(async (data) => {
                console.log(data.dateOfAppointment.getTime());
                if (data.dateOfAppointment.getTime() <= (Date.now() - 86400000)) {
                    const updated = await Appointment.findOneAndUpdate(
                        { _id: data._id },
                        {
                            status: "Closed",
                        },
                        { new: true }
                    );
                    console.log("Updated appointment", updated);
                }
            }));

        } catch (error) {
            console.log("Unable to update appointments");
            console.log(error);
        }
    });
};
module.exports = itemsCronJob;
