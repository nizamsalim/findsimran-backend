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
        return res.json({
          success: false,
          error: {
            code: "profile/ex",
            message:
              "Profile already exists. Please use update profile endpoint",
          },
        });
      }
      Profile.create(profileValues)
        .then((newProfile) => {
          res.json({ success: true, newProfile });
        })
        .catch((err) => {
          res.json({
            success: false,
            error: {
              code: "profile/ref-doc",
              message: "Please refer documentation and pass appropriate values",
            },
          });
        });
    });
  } catch (err) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code PR-CRT",
      },
    });
  }
};
//get the profile using user id
exports.getProfile = (req, res) => {
  try {
    Profile.findOne({ _uid: req.user._id }).then((profile) => {
      if (!profile) {
        return res.json({
          success: false,
          error: {
            code: "profile/nf",
            message: "Profile not found",
          },
        });
      }
      res.json({ success: true, profile });
    });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code PR-GT",
      },
    });
  }
};
exports.deleteProfile = (req, res) => {
  try {
    Profile.findOneAndRemove({ _uid: req.user._id }).then(() => {
      res.json({ success: true });
    });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code PR-DL",
      },
    });
  }
};

//updating profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _uid: req.user._id });
    if (!profile) {
      return res.json({
        success: false,
        error: {
          code: "profile/nf",
          message: "Profile not found, please use create endpoint",
        },
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
          $set: {
            professionalExperience: updatedValues.professionalExperience,
          },
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
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code PR-UPD",
      },
    });
  }
};

// get all profiles for displaying list
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ _uid: { $ne: req.user._id } }).select(
      "name preferredLocation preferredModeOfWork workingHoursPerDay expectedWagePerHour skills -_id"
    );
    console.log(profiles);
    if (!profiles) {
      return res.json({
        success: false,
        error: {
          code: "profile/emp",
          message: "No profiles found",
        },
      });
    }
    res.json({ success: true, profiles });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code PR-GTA",
      },
    });
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _uid });
    if (!profile) {
      return res.json({
        success: false,
        error: {
          code: "profile/nf",
          message: "Profile not found",
        },
      });
    }
    res.json({ success: true, profile });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message:
          "Internal server error. Contact backend team with code PR-GTUPID",
      },
    });
  }
};
