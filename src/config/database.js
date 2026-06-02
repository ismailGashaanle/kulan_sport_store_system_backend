

const express = require("express");

const mongoose = require("mongoose");


 require("dotenv").config();

const ConnectDB = async ()=>{
try{
    
    await mongoose.connect(process.env.DatabaseURL)
}catch(err){
    throw new Error("not connected database  " + err.message)
}


}



module.exports = ConnectDB
