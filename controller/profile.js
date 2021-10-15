//get the user personal details from signup
//if the user wanna change the name and stuff can change from here
//get all the experince stuff and projects and information

const Profile = require("../models/profile");
const person = require("../models/user");
exports.createProfile = (req, res) => {
  try {
    const profileValues = {
      _uid: null,
      socialLinks: {},
      academicDetails: [],
      professionalExperience: [],
      skills: [],
      projects: [],
      preferredLocation: null,
      preferredModeOfWork: null,
      workingHoursPerDay: null,
      expectedWagePerHour: null,
    };
    profileValues._uid = req.user._id;

    //getting the social links
    if (req.body.socialLinks) profileValues.socialLinks = req.body.socialLinks;

    //get the academicDetails
    if (req.body.academicDetails)
      profileValues.academicDetails = req.body.academicDetails;

    //get the professional experience
    if (req.body.professionalExperience)
      profileValues.professionalExperience = req.body.professionalExperience;

    // get the skills
    if (req.body.skills) profileValues.skills = req.body.skills;

    //get the projects
    if (req.body.projects) profileValues.projects = req.body.projects;

    //location,modeOfWork,hours,wage
    if (req.body.preferredLocation)
      profileValues.preferredLocation = req.body.preferredLocation;
    if (req.body.preferredModeOfWork)
      profileValues.preferredModeOfWork = req.body.preferredModeOfWork;
    if (req.body.workingHoursPerDay)
      profileValues.workingHoursPerDay = req.body.workingHoursPerDay;
    if (req.body.expectedWagePerHour)
      profileValues.expectedWagePerHour = req.body.expectedWagePerHour;

    //Database Stuff
    Profile.findOne({ _uid: req.user._id }).then((profile) => {
      if (profile) {
        return res.status(400).json({
          success: false,
          error: "Profile already exists. Please use updateProfile endpoint",
        });
      }
      Profile.create(profileValues)
        .then((newProfile) => {
          res.json({ success: true, newProfile });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            success: false,
            error: "Please refer documentation and pass appropriate values",
          });
        });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
//get the profile using user id
exports.getProfile = (req, res) => {
  Profile.findOne({ _uid: req.user._id }).then((profile) => {
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile does not exist" });
    }
    res.json({ success: true, profile });
  });
};
exports.deleteProfile = (req, res) => {
  Profile.findOneAndRemove({ _uid: req.user._id }).then(() => {
    res.json({ success: true });
  });
};

/*
//updating profile
exports.updateProfile=(req,res)=>{
   const updatedProfile=req.body;
   Profile.findOne({user:req.user._id})
   
   .then(profile=>{
    if(profile){
      Profile.findByIdAndUpdate(
        {user:req.user._id},
        {$set:updatedProfile},
        {new:true}
        )
        .then(profile=>{
          res.json(profile);
        })
        .catch(err=>{
          console.log("error in saving the profile by user id"+err);
        })
    }else{
      res.json({success:false,message:"profile is not found to update"})
    }
   })
   .catch(err=>{
     console.log("error in updating the profile"+err);
   })
        
}
*/
