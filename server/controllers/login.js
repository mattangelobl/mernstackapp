// loginController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { loginEmail, loginPassword } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email: loginEmail });

    // If the user doesn't exist, return an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

    // If the password doesn't match, return an error response
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If the password is valid, generate a JWT token
    const token = jwt.sign({ userId: user._id }, "secretKey");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = login;
