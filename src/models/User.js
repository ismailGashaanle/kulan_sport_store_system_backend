
const mongoose = require("mongoose");
const validator = require("validator")



const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
         required:[true,"fill fullName"],
         trim:true,
         minlength:[4,"must be contains 4 letter minimum"],
         maxlength:[40,"must be contains 40 letter maximum"],
         lowercase:true
    },

    email:{
        type:String,
        unique:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },

    password:{
        type:String,
        required:[true,"please fill  password"],

        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password must be contains 8 characters")
            }
        }
        
    },

    phone:{
        type:String,
        required:[true,"fill phone numer"],
         unique:true,

         validate(value){
            if(!validator.isMobilePhone(value)){
                throw new  Error("invalid phone number")
            }
         }
         
    },

    role:{
        type:String,
        enum:["admin","user","storekeeper","sales_staff",'InventoryManager', "manager"],
        default:"user"
    },

    dateOfBirth: {
    type: Date,
    required: false
  },
  gender:{
    type:String,
    enum:["male","female"]
  },

  status:{
    type:String,
    enum:["pending","active","block","suspend","inactive"],
    default:"inactive"
  },

   photoImage:{
      type:String,
      trim:true,
      default:"https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
  }

},{
    timestamps:true
})



const User = mongoose.model("User",userSchema)

module.exports=User