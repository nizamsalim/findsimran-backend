const {
  createProfile,
  getProfile,
  deleteProfile,
  updateProfile,
  getAllProfiles,
  getUserProfileById,
} = require("../controller/profile");
const getUser = require("../middleware/getUser");
const router = require("express").Router();

//route-api/profile/createprofile
//type-post
//access-private
router.post("/createProfile", getUser, createProfile);

//route-api/profile/getprofile/
//type-get
//access-private
router.get("/getProfile", getUser, getProfile);

//route-api/profile/updateProfile
//type-post
//access-private
router.post("/updateProfile", getUser, updateProfile);

//route-api/profile/deleteProfile
//type-delete
//access-private
router.delete("/deleteProfile", getUser, deleteProfile);

//route-api/profile/getAllProfiles
//type-get
//access-private
router.get("/getAllProfiles", getUser, getAllProfiles);

//route-api/profile/getUserProfile/id
//type-get
//access-private
router.get("/getUserProfile/:uid", getUser, getUserProfileById);

module.exports = router;
