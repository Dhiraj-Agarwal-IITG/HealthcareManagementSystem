const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = "mongodb+srv://pandeyharsh230:AkceVeSRLCP7PSUB@cluster0.xrfpmxo.mongodb.net/";

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlparser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB Connection Success`))
    .catch((err) => {
      console.log(`DB Connection Failed`);
      console.log(err);
      process.exit(1);
    });
};
