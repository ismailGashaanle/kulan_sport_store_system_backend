const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "mobile_money", "card","zaad","edahab","bank"],
        default: "cash",
        required:true
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
      transactionId: {
      type:String,
      //required:true
    }

}, { timestamps: true });

// module.exports = mongoose.model("Payment", paymentSchema);


// const Payment = mongoose.model("Payment", paymentSchema);

// module.exports=Payment
module.exports = mongoose.models.Payment || mongoose.model("Payment", paymentSchema)