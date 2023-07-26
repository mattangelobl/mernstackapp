const mongoose = require('mongoose');

const URI =
  "mongodb+srv://admin:password12345@cluster0.3bmt92s.mongodb.net/Node-API?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};

module.exports = connectDB;