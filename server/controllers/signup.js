const User = require("../models/User");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  try {
    // Extract data from the request body
    const { fullName, role, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance using the Mongoose model
    const newUser = new User({
      fullName,
      role,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    console.error("Error signing up user:", err);
    res
      .status(500)
      .json({ message: "An error occurred while signing up user" });
  }
}

module.exports = signup;
