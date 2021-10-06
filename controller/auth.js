const User=require('../models/user');
const bcrypt=require('bcrypt');

exports.signUp=(req,res)=>{
    const email=req.body.email;
   User.findOne({email})
   .then((person)=>{
       if(person){
           return res.status(400).json({message:'email is already exists'})
       }
       else{
           const newUser=new User({
               name:req.body.name,
               userName:req.body.userName,
               password:req.body.password,
               email:req.body.email
           })
           bcrypt.genSalt(10,function(err,salt){
             bcrypt.hash(newUser.password,salt,function(err,hash){
                   if(err) throw err;
                   //store hash in your DB
                   newUser.password=hash;
                   
                   newUser.save()
                   .then((user)=>{
                       const responseUser={
                           name:user.name,
                           email:user.email,
                           id:user._id,
                           userName:user.userName
                       }
                     return res.json({sucess:true,user:responseUser});
                   })
                   .catch((err)=>{
                       console.log(err)
                   })
               })
           })
       }
   })
}


//Here goes the login controller