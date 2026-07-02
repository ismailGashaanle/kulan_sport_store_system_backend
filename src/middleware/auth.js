
const express = require("express");
const User = require("../models/User");

const jwt = require("jsonwebtoken");




const UserAuth = async(req,res,next)=>{


    try{

        const token = req.cookies?.token;

        if(!token){
            return res.status(400).json({
                message:"please login"
            })
        }

        const decoded =  jwt.verify(token,process.env.SecretKey);

        const { id } = decoded;
        if (!id) {
  return res.status(401).json({ message: "invalid token" });
}

        const user = await User.findById(id);
        

        if(!user){

            return res.status(401).json({
                message:"user not found"
            })
        }

        req.user= user

        next();


    }catch(err){
        return res.status(401).json({
            message:err.message + "unauthorized"
        })
    }

}




module.exports=UserAuth