
// const mongoose = require("mongoose");

// const receiptSchema = new mongoose.Schema({



//     customerUserId:{
//          type:mongoose.Schema.Types.ObjectId,
//           ref:"User"
//          },
    
//     transactionNo:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Payment",
//          required:true
//     },

//     orderId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Order",
//         required:true
//     },
//     customerName:{
//         type:String,
//         required:true
//     },
//     amount:{
//         type:Number,
//         required:true
//     },
//     paymentMethod:{
//         type:String,
//         required:true
//     },
//     paymentStatus:{
//       type:String,
//         required:true
//     },

//     date:{
//         type:Date,
//         required:true,
//         default:Date.now()
//     },



// },{timestamps:true})



// const receipt = mongoose.model("receipt",receiptSchema);

// module.exports=receipt


const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({

    receiptNumber: {
        type: String,
        unique: true,
        required: true,
        default: function() {
            // Generate a unique receipt number: RCP-YYYYMMDD-XXXXX
            const date = new Date();
            const dateStr = date.getFullYear() + 
                           String(date.getMonth() + 1).padStart(2, '0') + 
                           String(date.getDate()).padStart(2, '0');
            const random = Math.floor(10000 + Math.random() * 90000);
            return `RCP-${dateStr}-${random}`;
        }
    },

    customerUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    transactionNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    paymentStatus: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now // Removed () so it's a function reference
    },

}, { timestamps: true })

const receipt = mongoose.model("receipt", receiptSchema);

module.exports = receipt;