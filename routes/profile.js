const { createProfile,getProfile,deleteProfile,updateProfile }= require('../controller/profile');
const getUser =require("../middleware/getUser");
const router=require('express').Router();

//route-api/profile/createprofile
//type-post
//acess-private
router.post('/createProfile',getUser,createProfile);



//route-api/profile/getprofile/
//type-get
//acess-private
router.get('/getProfile/',getUser,getProfile);


/*
//route-api/profile/updateProfile
//type-post
//acess-private
router.post('/updateProfile',getUser,updateProfile);
*/


//route-api/profile/deleteProfile
//type-delete
//acess-private
router.delete('/deleteProfile',getUser,deleteProfile);

module.exports=router;