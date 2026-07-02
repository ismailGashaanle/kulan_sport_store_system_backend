
 
// // const mongoose = require("mongoose");


// // const OrderSchema = new mongoose.Schema({

// //     customerId:{
// //         type:mongoose.Schema.ObjectId,
// //         ref:"user",
// //         required:true,
// //     },

// //    orderNumber: {

// //         type:Number,

// //     },
// //     productId:{
// //         type:mongoose.Schema.ObjectId,
// //         ref:"product",
// //         required:true
// //     },

// //     productCode:{
// //          type:mongoose.Schema.ObjectId,
// //          ref:"product",
// //          required:true  
// //     },

// //     price:{
// //         type:mongoose.Schema.ObjectId,
// //          ref:"product",
// //         required:true
// //     },

// //      // quantity * price
// //     subtotal:{
// //         type:Number,
// //         required:true
// //     },

// //     // optional
// //     size:{
// //         type:String
// //     },

// //     color:{
// //         type:String
// //     },

// //     // cart status
// //     status:{
// //         type:String,
// //         enum:["active","ordered","removed"],
// //         default:"active"
// //     }




// // },{
// //     timestamps:true
// // });



// // const Order = mongoose.model("Order",OrderSchema);

// // module.exports = Order


// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({

//     customerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     orderNumber: {
//         type: String,
        
//     },

//     items: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "OrderItem"
//     }],

//     totalAmount: {
//         type: Number,
//         required: true
//     },

//     status: {
//         type: String,
//         enum: ["pending", "paid", "shipped", "cancelled"],
//         default: "pending"
//     },

//     paymentStatus: {
//         type: String,
//         enum: ["unpaid", "paid"],
//         default: "unpaid"
//     }

// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);

// const mongoose = require("mongoose");

// // Counter Schema
// const counterSchema = new mongoose.Schema({
//   name: String,
//   seq: { type: Number, default: 0 }
// });

// const Counter = mongoose.model("Counter", counterSchema);

// // Order Schema
// const orderSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },

//     orderNumber: {
//       type: Number,
//       unique: true
//     },

//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true
//         },
//         productCode: String,
//         productName: String,
//         price: Number,
//         quantity: Number,
//         subtotal: Number
//       }
//     ],

//     totalAmount: {
//       type: Number,
//       required: true
//     },

//     status: {
//       type: String,
//       enum: ["pending", "paid", "shipped", "cancelled"],
//       default: "pending"
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["unpaid", "paid"],
//       default: "unpaid"
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cash", "card", "zaad"],
//       default: "cash"
//     }
//   },
//   { timestamps: true }
// );

// // AUTO INCREMENT ORDER NUMBER
//  orderSchema.pre("save", async function () {
//   const counter = await Counter.findOneAndUpdate(
//     { name: "order" },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );

//   this.orderNumber = counter.seq;
// });


// module.exports = mongoose.model("Order", orderSchema);




// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({

//   customerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },

//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true
//       },

//       quantity: {
//         type: Number,
//         required: true
//       },

//       price: {
//         type: Number,
//         required: true
//       }
//     }
//   ],

//   totalAmount: {
//     type: Number,
//     required: true
//   },
//     paymentStatus: {
//     type: String,
//     enum: ["pending", "paid", "failed"],
//     default: "pending"
//   },

//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
//     default: "pending"
//   },

//   address: {
//     street: String,
//     city: String,
//     country: String
//   },

//   delivery: {
//     fullName: String,
//     phone: String,
//     deliveryDate: Date
//   }

// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);


// models/Order.js (Updated with delivery)
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },

  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },

  // ADD DELIVERY FIELD BACK
  delivery: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryDate: { type: Date, required: true }
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);