const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    productCode: String,
    productName: String,

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("OrderItem", orderItemSchema);