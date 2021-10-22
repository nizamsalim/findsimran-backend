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
  try {
    Profile.findOne({ _uid: req.user._id }).then((profile) => {
      if (!profile) {
        return res
          .status(404)
          .json({ success: false, error: "Profile does not exist" });
      }
      res.json({ success: true, profile });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
exports.deleteProfile = (req, res) => {
  try {
    Profile.findOneAndRemove({ _uid: req.user._id }).then(() => {
      res.json({ success: true });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//updating profile
exports.updateProfile = async (req, res) => {
  const profile = await Profile.findOne({ _uid: req.user._id });
  if (!profile) {
    return res.status(404).json({
      success: false,
      error: "Profile not found, please use create endpoint",
    });
  }
  const updatedValues = req.body;
  if (updatedValues.academicDetails) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { academicDetails: updatedValues.academicDetails },
      }
    );
  }
  if (updatedValues.professionalExperience) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { professionalExperience: updatedValues.professionalExperience },
      }
    );
  }
  if (updatedValues.skills) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { skills: updatedValues.skills },
      }
    );
  }
  if (updatedValues.projects) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { projects: updatedValues.projects },
      }
    );
  }
  if (updatedValues.socialLinks) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { socialLinks: updatedValues.socialLinks },
      }
    );
  }
  if (updatedValues.preferredLocation) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { preferredLocation: updatedValues.preferredLocation },
      }
    );
  }
  if (updatedValues.preferredModeOfWork) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { preferredModeOfWork: updatedValues.preferredModeOfWork },
      }
    );
  }
  if (updatedValues.workingHoursPerDay) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { workingHoursPerDay: updatedValues.workingHoursPerDay },
      }
    );
  }
  if (updatedValues.expectedWagePerHour) {
    await Profile.findOneAndUpdate(
      { _uid: req.user._id },
      {
        $set: { expectedWagePerHour: updatedValues.expectedWagePerHour },
      }
    );
  }
  const updatedProfile = await Profile.findOne({ _uid: req.user._id });
  res.json({ success: true, updatedProfile });
};

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
  try {
    const profile = await Profile.findOne({ _uid });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }
    res.json({ success: true, profile });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
