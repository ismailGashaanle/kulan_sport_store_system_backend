
const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({



    customerUserId:{
         type:mongoose.Schema.Types.ObjectId,
          ref:"User"
         },
    
    transactionNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment",
         required:true
    },

    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentStatus:{
      type:String,
        required:true
    },

    date:{
        type:Date,
        required:true,
        default:Date.now()
    },



},{timestamps:true})



const receipt = mongoose.model("receipt",receiptSchema);

module.exports=receipt