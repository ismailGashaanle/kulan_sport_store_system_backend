 
const express = require('express');
const UserAuth = require('../middleware/auth');
const profileRouter = express.Router();
const User = require("../models/User");
const { validateProfileEdit } = require('../utils/checkValidate');
const bcrypt = require("bcrypt")



profileRouter.get("/api/profile/view",UserAuth,async(req,res)=>{

    try{

        const logginUser=req.user
        const logginUserID=logginUser._id

          const user=await User.findOne({_id:logginUserID});

        if(!user){
            res.json({
                message:"not found user profile"
            })
        }


        const UserData={
            fullName:user.fullName,
            email:user.email,
            role:user.role,
            phone:user.phone,
            gender:user.gender,
             dateOfBirth:user.dateOfBirth,
            photoImage:user.photoImage
           
        }
       


        res.json({
            data:UserData
        })
       
        

 

     
    }catch(err){

        res.status(401).json({
            message:err.message
        })
    }

})


profileRouter.patch("/api/profile/edit",UserAuth,async(req,res)=>{

    try{
   validateProfileEdit(req)
        const logginUser = req.user;

        if(!logginUser){
            res.status(401).json("please login")
        }

        const {fullName,phone,dateOfBirth,photoImage,gender}=req.body

        const user = await User.findByIdAndUpdate(logginUser._id,{
         fullName,
         phone,
         dateOfBirth,
         photoImage,
         gender

        })

       const updateProfileUSER = await user.save();

       res.status(201).json({
        message: logginUser.fullName + " your are  updated profile "  ,
        data:updateProfileUSER
       })

    }catch(err){
   
   res.json({
    message:err.message
   })

    }

})



profileRouter.patch("/api/profile/changepassword",UserAuth,async(req,res)=>{
    try{
      
        //get loggin user 
        // find user 
        // update body to database user isStrongPassword

        const logginUser= req.user
        const {password}=req.body
        const user = await User.findById(logginUser._id);
       
        if(!user){
            return res.status(400).json("user not found")
        }


       const  passwordHash = await bcrypt.hash(password,10)

        user.password=passwordHash
        await user.save()

        res.status(201).json({
            message:"update password successfuly",
            data:user
        })
        

    }catch(err){
       res.status(400).json({
        message:err.message
       })
    }
})




module.exports= profileRouter