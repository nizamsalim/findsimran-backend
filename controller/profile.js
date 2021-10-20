//get the user personal details from signup
//if the user wanna change the name and stuff can change from here
//get all the experince stuff and projects and information

const Profile = require("../models/profile");
const User = require("../models/user");
exports.createProfile = async (req, res) => {
  try {
    const profileValues = {
      name: null,
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
    const user = await User.findById(req.user._id);
    profileValues.name = user.name;
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
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error", message: err });
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

//updating profile
exports.updateProfile = (req, res) => {};

// get all profiles for displaying list
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ _uid: { $ne: req.user._id } }).select(
      "name preferredLocation preferredModeOfWork workingHoursPerDay expectedWagePerHour skills -_id"
    );
    if (!profiles) {
      return res
        .status(404)
        .json({ success: false, error: "No profiles found" });
    }
    res.json({ success: true, profiles });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.getUserProfileById = async (req, res) => {
  const _uid = req.params.uid;
  const profile = await Profile.findOne({ _uid });
  if (!profile) {
    return res.status(404).json({ success: false, error: "Profile not found" });
  }
  res.json({ success: true, profile });
};
