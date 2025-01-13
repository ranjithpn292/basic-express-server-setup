// import mongodb connection
const mongoose = require("mongoose");

async function connectMongoDB(url) {
  // connect database
  return mongoose
    .connect(url)
    .then(() => console.log(" Mongo DB connected"))
    .catch((err) => console.log("MOngo Err", err));
}

module.exports = { connectMongoDB };
