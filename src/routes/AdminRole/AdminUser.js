const express= require ("express")
const UserAuth = require("../../middleware/auth")
//const User = require ("./../../models/User")
const User = require ("../../models/User");
const { validateSignUp } = require("../../utils/checkValidate");
const bcrypt = require("bcrypt")

const AdminUser = express.Router();

const Saved_Datat_User=["fullName","role","email","phone","photoImage","dateOfBirth","gender"]
 AdminUser.get("/api/v1/admin/users",UserAuth,async(req,res)=>{


    try{

        const logginUser=req.user;
 


        if(logginUser.role !== "admin"){
             throw new Error("access denided onlu Admin can Access")
        }

        const user= await User.find({}).select(Saved_Datat_User);
        res.json({
            message:"list All user",
            count: user.length,
            data:user
        })



    }catch(err){

        res.status(401).json({
            message:err.message
        })

    }



})


AdminUser.get("/api/v1/admin/users/:id",UserAuth,async(req,res)=>{

    try{

        const logginUser= req.user;
        if(logginUser.role !=="admin"){
            throw new Error("access denied only can Access Admin")
        }
        const  { id } = req.params
        const  user = await User.findOne({_id:id}).select(Saved_Datat_User)

        if(!user){
            throw new Error ("user not found")
        }


        res.json({
            data:user
        })



    }catch(err){
        res.json({
            message:err.message
        })
    }

})


AdminUser.get("/api/v1/admin/user/email/:email",UserAuth,async(req,res)=>{

    try{

        const logginUser = req.user;

        if(logginUser.role !== "admin"){
            throw new Error("access denied only can Access Admin")
        };

        const {email}=req.params
        const user = await User.findOne({email:email}).select(Saved_Datat_User);
        if(!user){
            throw new Error("user not found")
        }
        if(!user){
            res.json({
                message:"user not found"
            })
        }
        


        res.json({
            data:user
        })



    }catch(err){
        res.status(400).json({
    message: err.message,
  });

        
    }

})

AdminUser.get("/api/v1/admin/user/phone/:phone",UserAuth,async(req,res)=>{
  

    try{
        const logginUser= req.user;

        if(logginUser.role !=="admin"){ 
            throw new Error ("Access Denied Only Can Access Admin")
        };

        const {phone } = req.params

        const user = await User.findOne({phone:phone})

        if(!user){
            throw new Error("user not found")
        }


        res.json({
            data:user
        })





    }catch(err){
    res.status(400).json({
        message: err.message,
    });

    }

})


AdminUser.post("/api/v1/admin/user/createsAccounts",UserAuth,async(req,res)=>{

    try{
    validateSignUp(req)
    const {fullName,email,phone,password,role,photoImage,gender}=req.body
        const logginUser = req.user
    if(logginUser.role !== "admin"){
        throw new Error("access denied only Can Access Admin")
    }

    const passswordHash = await bcrypt.hash(password,10)

    const user= await new User({
        fullName,
        email,
        password:passswordHash,
        role,
        phone

    })

    await user.save();
    
    res.status(200).json({
        data:user
    })


    }catch(err){
        res.status(400).json({
        message:err.message
        })
    }

})


AdminUser.delete("/api/v1/admin/user/deletedUser/id/:id",UserAuth,async(req,res)=>{

try{
        const logginUser=req.user;
    if(logginUser.role !=="admin"){
        throw new Error("Access denied only Admin Can Access")
    }

    const {id}= req.params
    const user = await User.findByIdAndDelete(id);
    if(!user){
        throw new Error("user not found to delete");
    }

    // await user.save();

    res.json({
        data:"deleted user successfuly" 
    })

}catch(err){
    res.status(400).json({
        message:err.message
    })
}
   


})


AdminUser.delete("/api/v1/admin/user/deletedUser/email/:email",UserAuth,async(req,res)=>{


    try{
        const logginUser=req.user;

        if(logginUser.role !=="admin"){
            throw new Error("Access denied only Admin Can Access")
        }


         const {email}=req.params
        const user  = await User.findOneAndDelete({email:email})

        res.json({
            message:"delete user successfuly"
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})

AdminUser.patch("/api/v1/admin/user/id/:id/:status",UserAuth,async(req,res)=>{


    try{
          const logginUser= req.user;

    if(logginUser.role !=="admin"){
        throw new Error("access denied only admin can Access");
    }

    const {id}=req.params;
    const {status}=req.params
    const user = await User.findById(id);
    
      user.status =
        user.status === "block"
          ? "active"
          : "block";

      await user.save();
    res.json({
        data:user
    })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
  

})



module.exports=AdminUser