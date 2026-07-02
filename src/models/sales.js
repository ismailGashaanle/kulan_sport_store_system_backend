const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({

  productCode: {
    type: String,
    required: true
  },

  productName: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  customerName: {
    type: String
  },

  soldBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  paymentMethod: {
    type: String,
    enum: ["cash", "card", "mobile_money"],
    default: "cash"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Sale", salesSchema);