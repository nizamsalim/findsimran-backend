const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  // user id of the user creating the profile
  _uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  academicDetails: {
    type: [
      {
        nameOfInstitution: { type: String, required: true },
        description: String,
        time: { type: Number, required: true },
        degree: String,
        percentage: { type: String, required: true },
      },
    ],
    default: [],
  },
  professionalExperience: {
    type: [
      {
        nameOfCompany: { type: String, required: true },
        jobPosition: { type: String, required: true },
        jobDescription: String,
        jobDuration: { type: String, required: true },
      },
    ],
    default: [],
  },
  skills:{
    type:[
      {
        nameOfSkill:{type:String,required:true},
        // beginner or intermediate or advanced
        experienceLevel:{type:String,required:true},
      }
    ],
    default:[]
  },
  projects: {
    type: [
      {
        nameOfProject: { type: String, required: true },
        projectDescription:String,
        links:{
          projectGithub:String,
          hostedLink:String
        }
      },
    ],
    default:[]
  },
  socialLinks: [
    {
      github: { type: String, required: true },
      linkedin: { type: String, required: true },
      portfolio: String,
    },
  ],
  preferredLocation:String,
  preferredModeOfWork:{type:String,required:true},
  workingHoursPerDay:{type:Number,required:true},
  expectedWagePerHour:{type:Number,required:true}
});
module.exports = mongoose.model("profile", ProfileSchema);