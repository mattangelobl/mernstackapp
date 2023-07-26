import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [showModal, setShowModal] = useState(false);

  // State variables to hold form data in SIGNUP
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables to hold form data in LOGIN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const refreshFormSignup = () => {
    setFullName("");
    setRole("");
    setEmail("");
    setPassword();
  };

  const refreshFormSignin = () => {
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create an object with the login credentials
    const loginData = {
      loginEmail,
      loginPassword,
    };

    try {
      // Make the API request to your backend server for login
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData
      );

      // Save the JWT token from the response to local storage or a cookie
      localStorage.setItem("accessToken", response.data.token);

      alert("Login successful!");
      refreshFormSignin();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error during login:", error.response.data);
      } else {
        console.error("Error during login:", error);
      }

      alert("Login failed. Please check your credentials.");
      refreshFormSignin();
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const newUser = {
      fullName,
      role,
      email,
      password,
    };

    try {
      //API request to backend server for signup
      const response = await axios.post(
        "http://localhost:5000/signup",
        newUser
      );
      console.log("Signup successful:", response.data);
      alert("Signup Successfully");
      refreshFormSignup();
      closeModal();
    } catch (error) {
      // Check if error.response exists and has the 'data' property
      if (error.response && error.response.data) {
        console.error("Error during signup:", error.response.data);
        alert("Signup Failed! Email already been registered.");
      } else {
        // Handle the error when error.response is undefined or has no 'data'
        console.error("Error during signup:", error);
        alert("Signup Failed! Email already been register.");
      }
    }
  };
  return (
    <div className="login-page">
      <div className="margin-page">
        <div className="content">
          <h1>Breddas Login System</h1>
          <div className="container">
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter Your Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
            <div className="login-text">
              <text>Doesn't have an account yet?</text>
              <text className="signup-text" onClick={openModal}>
                Click here to Signup
              </text>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal" id="signupModal">
          <form onSubmit={handleSubmitSignUp} className="modal-content">
            <button onClick={closeModal} className="close-modal">
              X
            </button>
            <h2>Please Fill in the Form</h2>
            <br></br>
            <input
              type="text"
              placeholder="Employee Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Employee Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
