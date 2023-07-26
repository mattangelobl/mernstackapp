const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./connect/db");
const cors = require("cors");
const port = 5000;
const signupController = require("./controllers/signup");
const loginController = require("./controllers/login");

const app = express();
app.use(cors());

connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signup", signupController);
app.post("/login", loginController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
