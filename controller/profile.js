//get the user personal details from signup 
//if the user wanna change the name and stuff can change from here 
//get all the experince stuff and projects and information

const Profile=require('../models/profile');
const person=require('../models/user');
exports.createProfile=(req,res)=>{
    const profileValues={};
    profileValues.user=req.user._id;
    //getting the social links 
    profileValues.socialLinks={};
    if(req.body.github) profileValues.socialLinks.github=req.body.github;
    if(req.body.linkedin) profileValues.socialLinks.linkedin=req.body.linkedin;
    if(req.body.portfolio) profileValues.socialLinks.portfolio=req.body.portfolio;
    //get the academicDetails
    profileValues.academicDetails={};
    if(req.body.nameOfInstitution) profileValues.academicDetails.nameOfInstitution=req.body.nameOfInstitution;
    if(req.body.description) profileValues.academicDetails.description=req.body.description;
    if(req.body.time) profileValues.academicDetails.time=req.body.time;
    if(req.body.degree) profileValues.academicDetails.degree=req.body.degree;
    if(req.body.percentage) profileValues.academicDetails.percentage=req.body.percentage;

    //get the professional experience
    profileValues.professionalExperience={};
    if(req.body.nameOfCompany) profileValues.professionalExperience.nameOfCompany=req.body.nameOfCompany;
    if(req.body.jobPosition) profileValues.professionalExperience.jobPosition=req.body.jobPosition;
    if(req.body.jobDescription) profileValues.professionalExperience.jobDescription=req.body.jobDescription;
    if(req.body.jobDuration) profileValues.professionalExperience.jobDuration=req.body.jobDuration;
    
    //get the skills 
    profileValues.skills={};
    if(req.body.nameOfSkill) profileValues.skills.nameOfSkill=req.body.nameOfSkill;
    if(req.body.experienceLevel) profileValues.skills.experienceLevel=req.body.experienceLevel;

    //get the projects 
    profileValues.projects={};
    if(req.body.nameOfProject) profileValues.projects.nameOfProject=req.body.nameOfProject;
    if(req.body.projectDescription) profileValues.projects.projectDescription=req.body.projectDescription;
    profileValues.projects.links={};
    if(req.body.projectGithub) profileValues.projects.links.projectGithub=req.body.projectGithub;
    if(req.body.hostedLink) profileValues.projects.links.hostedLink=req.body.hostedLink;
    
    //location,modeOfWork,hours,wage
    if(req.body.preferredLocation) profileValues.preferredLocation=req.body.preferredLocation;
    if(req.body.preferredModeOfWork) profileValues.preferredModeOfWork=req.body.preferredModeOfWork;
    if(req.body.workingHoursPerDay) profileValues.workingHoursPerDay=req.body.workingHoursPerDay;
    if(req.body.expectedWagePerHour) profileValues.expectedWagePerHour=req.body.expectedWagePerHour;

     //Database Stuff 
     Profile.findOne({user:req.user._id})
     .then(profile=>{
       if(profile){
         profile.findOneAndUpdate(
           {user:req.user._id},
           {$set:profileValues},
           {new:true}
           )
           .then(profile=>{
             res.json(profile);
           })
           .catch(err=>{
             console.log("error in saving the profile by user id");
           })
       }else {
        Profile.create(profileValues)
          .then((newProfile) => {
            res.json({ success: true, newProfile });
          })
          .catch((err) => {
            res
              .status(400)
              .json({
                success: false,
                error:
                  "Please refer documentation and pass appropriate values",
              });
          });
      }
     })
     .catch(err=>{
       console.log("error while fetching the profile"+err);
     })
    
}
//get the profile using user id  
exports.getProfile=(req,res)=>{
  Profile.findOne({user:req.user._id})
  .then((profile)=>{
    if(!profile){
      return res.status(404).json({sucess:"false",message:"No profile found"})
    }
    res.json(profile)
  })
  .catch(err=>{
    console.log("error in getting the profile"+err);
  })
}
exports.deleteProfile=(req,res)=>{
    Profile.findOne({user:req.user._id});
    Profile.findOneAndRemove({user:req.user._id})
    .then(()=>{
      person.findOneAndRemove({_id:req.user._id})
      .then(()=>{
        res.json({"sucess":true,message:"profile sucessfully removed"});
      })
      .catch(err=>{
        console.log(err)
      })
    })
}

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