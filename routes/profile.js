const { createProfile,getProfile,deleteProfile }= require('../controller/profile');
const getUser =require("../middleware/getUser");
const router=require('express').Router();

//route-api/profile/createprofile
//type-post
//access-private
router.post('/createProfile',getUser,createProfile);



//route-api/profile/getprofile/
//type-get
//access-private
router.get('/getProfile',getUser,getProfile);


/*
//route-api/profile/updateProfile
//type-post
//access-private
router.post('/updateProfile',getUser,updateProfile);
*/


//route-api/profile/deleteProfile
//type-delete
//access-private
router.delete('/deleteProfile',getUser,deleteProfile);

module.exports=router;
