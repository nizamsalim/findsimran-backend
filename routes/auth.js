//get the controller
//post route for storing data into db
//validate the username and password inside the route
const express=require('express');
const router= express.Router();
const { signUp } =require('../controller/auth');
const validateSignup =require('../middleware/validation');

router.post("/signUp",validateSignup,signUp);

//Here goes router for sign in



//Here goes the router for sign out
module.exports=router;