//get the controller
//post route for storing data into db
//validate the username and password inside the route
const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controller/auth");
const validateSignup = require("../middleware/validation");

// SIGNUP ENDPOINT
// POST /api/auth/signup
router.post("/signup", validateSignup, signUp);

// LOGIN ENDPOINT
// POST /api/auth/login
router.post("/login", login);

//Here goes the router for sign out
module.exports = router;
