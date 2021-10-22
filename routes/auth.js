//get the controller
//post route for storing data into db
//validate the username and password inside the route
const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  updateUsername,
  updateName,
  changePassword,
  getCurrentUserDetails,
} = require("../controller/auth");
const validateSignup = require("../middleware/validation");
const getUserFromAuthToken = require("../middleware/getUser");

// SIGNUP ENDPOINT
// POST /api/auth/signup
router.post("/signup", validateSignup, signUp);

// LOGIN ENDPOINT
// POST /api/auth/login
router.post("/login", login);

// UPDATE USERNAME ENDPOINT
// POST /api/auth/updateusername
router.post("/updateusername", getUserFromAuthToken, updateUsername);

// UPDATE NAME ENDPOINT
// POST /api/auth/name
router.post("/updatename", getUserFromAuthToken, updateName);

// CHANGE PASSWORD ENDPOINT
// POST /api/auth/name
router.post("/changepassword", getUserFromAuthToken, changePassword);

// GET CURRENT USER DETAILS ENDPOINT
// POST /api/auth/getcurrentuser
router.get("/getcurrentuser", getUserFromAuthToken, getCurrentUserDetails);
module.exports = router;
