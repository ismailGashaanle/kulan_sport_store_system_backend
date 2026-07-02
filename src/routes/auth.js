
const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const { validateSignUp } = require("../utils/checkValidate");
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const UserAuth = require("../middleware/auth");

const Public_Data_User=["fullName","email","phone","status"]
authRouter.post("/api/auth/register",async(req,res)=>{


    try{
        validateSignUp(req)
        const {fullName,email,password,role,phone}=req.body

        const extingUser= await User.findOne({email:email})
        if(extingUser){
            throw new Error("already email exitg")
        }

      
        const passwordHash = await bcrypt.hash(password,10)
      
    const user = await new  User({

        fullName,
        email,
        password:passwordHash,
        role,
        phone,


    })

      


  const NewUser  = await user.save();


  
const UserData={
    fullName:user.fullName,
    email:user.email,
    phone:user.phone,
}


  res.status(201).json({
    message:"successfuly register",
    data:UserData
  })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }




})


authRouter.post("/api/auth/login",async(req,res)=>{

    try{

        const {email,password}=req.body;

        const user = await User.findOne({email:email})
 
      
        if(!user){
            throw new Error("invalid credentails")

        
        }



       const  checkHashPassword  = await bcrypt.compare(password,user.password)

        
        if(!checkHashPassword){
            throw new Error("invalid credentails")
        }

        if(user.status === "block"){
             throw new Error("please contact Admin the system was blocked")
        }


        const token = await jwt.sign({id:user._id},process.env.SecretKey,{expiresIn:"1d"});
          res.cookie("token",token,{ expires: new Date(Date.now() + 8 * 3600000) })
          
         const UpdatedStatus = await User.findByIdAndUpdate(user._id,{
            status:"active"
         })

         await UpdatedStatus.save()
           
        const UserData={
            fullName:user.fullName,
            email:user.email,
            phone:user.phone,
            status:user.status
           
        }

        res.status(200).json({
            data:UserData
        })




    }catch(err){
   res.status(400).json({
    message:err.message
   })
    }

})



authRouter.post("/api/auth/logout",UserAuth,async(req,res)=>{

    try{

           
        const logginUser =req.user;
        
     const user = await User.findByIdAndUpdate(logginUser._id,{
            status:"inactive"
        })

       
        await user.save();

      
        
        res.cookie("token",null, {expires: new Date(0)})
        res.json({
            message:"successfuly logout " 
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})


module.exports=authRouter
