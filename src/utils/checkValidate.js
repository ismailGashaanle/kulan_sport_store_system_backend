 
const validator = require("validator")


const validateSignUp=(req)=>{

    const {fullName,email,phone,role,password}=req.body

    if(!fullName){
        throw new Error("please fill fullName")
    }

    if(!email){
        throw new Error("fill email")
    }

    if(!password){
        throw new Error("fill password")
    }
    if(!role){
        throw new Error("fill role")
    }

}

const validateProfileEdit =(req)=>{

    const allowFieldsEdit=["fullName","photoImage","phone","gender","dateOfBirth"];
    const updated=Object.keys(req.body);

   
    const isValidateEdit = updated.every((fields)=>(
        allowFieldsEdit.includes(fields)
    ))


    if(!isValidateEdit){
        throw new Error("invalid update fields");
    }

}






module.exports={validateSignUp,validateProfileEdit}