// const express = require("express");
// const UserAuth = require("../../middleware/auth");
// const Payment = require("../../models/PAYMENT");
// const Order = require("../../models/Order");
// const Receipt = require("../../models/Receipt");
// const Product = require("../../models/products");
// <<<<<<< HEAD
// const { sendEmail } = require("../../utils/sendEmail");

// =======
// >>>>>>> 3e2a52907a7c2857d52f0981a4347420568b4c8d

// const paymentRouter = express.Router();



// /*
// | Method | Endpoint                             | Purpose              |
// | ------ | ------------------------------------ | -------------------- |
// | POST   | `/api/v1/payments/:orderId`          | Pay for an order     |
// | GET    | `/api/v1/payments/my`                | Get my payments      |
// | GET    | `/api/v1/payments/:paymentId`        | Get single payment   |
// | PATCH  | `/api/v1/payments/:paymentId/cancel` | Cancel payment       |
// | GET    | `/api/v1/payments/order/:orderId`    | Get payment by order |

// */

// paymentRouter.post("/api/v1/payments/:orderId",UserAuth,async(req,res)=>{

//     try{

//            const logginUser = req.user;
//         if(!logginUser){
//          throw new Error("not makes order please login")
//         }

//         if(logginUser.role !=="user"){
//             throw new Error("you'r not have permision to make order")
//         }
//         const {orderId}=req.params;
//    const {customerId,amount,paymentStatus,paymentMethod,customerName,customerUserId,transactionNo}=req.body
      
//         const order = await Order.findById(orderId)
//         if(!order){
//             throw new Error("not found order")
//         }

//         const checkorderIdByPayment= await Payment.findOne({orderId:orderId})
//         if(checkorderIdByPayment){
//             throw new Error("al ready you payment")
//         }
     

//         const payment=  new Payment({
   
//             orderId:orderId,
//             customerId:logginUser._id,
//             amount:order.totalAmount,
//             paymentStatus:"completed",
//             paymentMethod,

//         })

//         for (const item of order.items) {

//   const product = await Product.findById(item.productId);

//   if (!product) {
//     throw new Error("Product not found");
//   }

//   // check stock
//   if (product.quantity < item.quantity) {
//     throw new Error(
//       `${product.productName} does not have enough stock`
//     );
//   }

//   // reduce quantity
//   product.quantity -= item.quantity;

//   // update stock status
//   if (product.quantity <= 0) {
//     product.status = "out_stock";
//   }

//   await product.save();

// }

        
      
     

//         await payment.save();
// <<<<<<< HEAD
//         try {
//   await sendEmail({
//     to: logginUser.email,
//     subject: "Payment Successful",
//     text: `Hello ${logginUser.fullName}, your payment has been received successfully.`,
//     html: `
//       <h2>Payment Successful</h2>

//       <p>Hello <strong>${logginUser.fullName}</strong>,</p>

//       <p>Your payment has been completed successfully.</p>

//       <ul>
//         <li><strong>Order ID:</strong> ${order._id}</li>
//         <li><strong>Payment ID:</strong> ${payment._id}</li>
//         <li><strong>Amount:</strong> $${payment.amount}</li>
//         <li><strong>Payment Method:</strong> ${payment.paymentMethod}</li>
//         <li><strong>Status:</strong> ${payment.paymentStatus}</li>
//       </ul>

//       <p>Thank you for shopping with us.</p>
//     `,
//   });
// } catch (emailError) {
//   console.error("Email sending failed:", emailError);
// }
// =======
// >>>>>>> 3e2a52907a7c2857d52f0981a4347420568b4c8d

//       const receipt = await Receipt.create({

//                 transactionNo: payment._id,
//                 customerName:logginUser.fullName,

//                 orderId: order._id,
//                 customerUserId:logginUser._id,

//                 paymentId: payment._id,

//                 customerId: logginUser._id,

//                 amount: payment.amount,

//                 paymentMethod: payment.paymentMethod,

//                 paymentStatus: payment.paymentStatus,

//                 date: Date.now()
  

// });

//          order.paymentStatus = "paid";
//         order.status = "confirmed";

//         await order.save();


//         res.json({
//             message:"successfuly payment paid",
//             data:payment
//         })




//     }catch(err){
//         res.json({
//             message:err.message
//         })
//     }

// })


// paymentRouter.get("/api/v1/my/payment",UserAuth,async(req,res)=>{
//     try{
//              const logginUser = req.user;
//         if(!logginUser){
//          throw new Error("not makes order please login")
//         }

//         if(logginUser.role !=="user"){
//             throw new Error("you'r not have permision to make order")
//         }

//         const payment= await Payment.find()
//        let customerId = payment.customerId;
//           const  myPayment= await Payment.find({customerId:logginUser._id})
//         if(!myPayment){
//             throw new Error("not found your payment")
//         }

//         res.json({
//             count:myPayment.length,
//             data:myPayment
//         })


//     }catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }
// })






// // paymentRouter.post("/api/v1/payment/pay/:orderId", UserAuth, async (req, res) => {
// //   try {
// //     const { paymentMethod } = req.body;

// //     const order = await Order.findById(req.params.orderId);

// //     if (!order) throw new Error("Order not found");
// //     const logginUser= req.user

// //     const payment = await Payment.create({
// //       orderId: order._id,
// //       customerId: logginUser._id,
// //       amount: order.totalAmount,
// //       paymentMethod,
// //       paymentStatus: "completed"
// //     });

// //     order.paymentStatus = "paid";
// //     order.status = "paid";

// //     await order.save();

// //     res.json({
// //       message: "Payment successful",
// //       data: payment
// //     });

// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // });



// // paymentRouter.get("/api/v1/payment/my", UserAuth, async (req, res) => {
// //   const payments = await Payment.find({ customerId: req.user._id });

// //   res.json({
// //     count: payments.length,
// //     data: payments
// //   });
// // });



// // paymentRouter.get("/api/v1/payment/order/:orderId", UserAuth, async (req, res) => {
// //   const payment = await Payment.findOne({ orderId: req.params.orderId });

// //   res.json({ data: payment });
// // });






// module.exports=paymentRouter


const express = require("express");
const UserAuth = require("../../middleware/auth");
const Payment = require("../../models/PAYMENT");
const Order = require("../../models/Order");
const Receipt = require("../../models/Receipt");
const Product = require("../../models/products");
const { sendEmail } = require("../../utils/sendEmail");

const paymentRouter = express.Router();

/*
| Method | Endpoint                             | Purpose              |
| ------ | ------------------------------------ | -------------------- |
| POST   | `/api/v1/payments/:orderId`          | Pay for an order     |
| GET    | `/api/v1/payments/my`                | Get my payments      |
| GET    | `/api/v1/payments/:paymentId`        | Get single payment   |
| PATCH  | `/api/v1/payments/:paymentId/cancel` | Cancel payment       |
| GET    | `/api/v1/payments/order/:orderId`    | Get payment by order |
*/

paymentRouter.post("/api/v1/payments/:orderId", UserAuth, async (req, res) => {
    try {
        const logginUser = req.user;
        if (!logginUser) {
            throw new Error("Please login to make payment");
        }

        if (logginUser.role !== "user") {
            throw new Error("You don't have permission to make payment");
        }

        const { orderId } = req.params;
        const { paymentMethod } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        // Check if payment already exists for this order
        const checkorderIdByPayment = await Payment.findOne({ orderId: orderId });
        if (checkorderIdByPayment) {
            throw new Error("Payment already made for this order");
        }

        // Create payment
        const payment = new Payment({
            orderId: orderId,
            customerId: logginUser._id,
            amount: order.totalAmount,
            paymentStatus: "completed",
            paymentMethod: paymentMethod || "cash",
        });

        // Update product quantities
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            // Check stock
            if (product.quantity < item.quantity) {
                throw new Error(`${product.productName} does not have enough stock`);
            }

            // Reduce quantity
            product.quantity -= item.quantity;

            // Update stock status
            if (product.quantity <= 0) {
                product.status = "out_stock";
            }

            await product.save();
        }

        await payment.save();

        // Send email notification
        try {
            await sendEmail({
                to: logginUser.email,
                subject: "Payment Successful",
                text: `Hello ${logginUser.fullName}, your payment has been received successfully.`,
                html: `
                    <h2>Payment Successful</h2>
                    <p>Hello <strong>${logginUser.fullName}</strong>,</p>
                    <p>Your payment has been completed successfully.</p>
                    <ul>
                        <li><strong>Order ID:</strong> ${order._id}</li>
                        <li><strong>Payment ID:</strong> ${payment._id}</li>
                        <li><strong>Amount:</strong> $${payment.amount}</li>
                        <li><strong>Payment Method:</strong> ${payment.paymentMethod}</li>
                        <li><strong>Status:</strong> ${payment.paymentStatus}</li>
                    </ul>
                    <p>Thank you for shopping with us.</p>
                `,
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
        }

        // Create receipt
        const receipt = await Receipt.create({
            transactionNo: payment._id,
            customerName: logginUser.fullName,
            orderId: order._id,
            customerUserId: logginUser._id,
            paymentId: payment._id,
            customerId: logginUser._id,
            amount: payment.amount,
            paymentMethod: payment.paymentMethod,
            paymentStatus: payment.paymentStatus,
            date: Date.now()
        });

        // Update order status
        order.paymentStatus = "paid";
        order.status = "confirmed";
        await order.save();

        res.json({
            message: "Payment successful",
            data: payment,
            receipt: receipt
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

paymentRouter.get("/api/v1/my/payment", UserAuth, async (req, res) => {
    try {
        const logginUser = req.user;
        if (!logginUser) {
            throw new Error("Please login to view your payments");
        }

        if (logginUser.role !== "user") {
            throw new Error("You don't have permission to view payments");
        }

        const myPayment = await Payment.find({ customerId: logginUser._id });
        
        if (!myPayment || myPayment.length === 0) {
            return res.json({
                message: "No payments found",
                count: 0,
                data: []
            });
        }

        res.json({
            count: myPayment.length,
            data: myPayment
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Get single payment by ID
paymentRouter.get("/api/v1/payments/:paymentId", UserAuth, async (req, res) => {
    try {
        const logginUser = req.user;
        if (!logginUser) {
            throw new Error("Please login");
        }

        const payment = await Payment.findById(req.params.paymentId);
        if (!payment) {
            throw new Error("Payment not found");
        }

        // Check if user owns this payment or is admin
        if (payment.customerId.toString() !== logginUser._id.toString() && logginUser.role !== "admin") {
            throw new Error("You don't have permission to view this payment");
        }

        res.json({
            data: payment
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Cancel payment
paymentRouter.patch("/api/v1/payments/:paymentId/cancel", UserAuth, async (req, res) => {
    try {
        const logginUser = req.user;
        if (!logginUser) {
            throw new Error("Please login");
        }

        const payment = await Payment.findById(req.params.paymentId);
        if (!payment) {
            throw new Error("Payment not found");
        }

        // Check if user owns this payment
        if (payment.customerId.toString() !== logginUser._id.toString()) {
            throw new Error("You don't have permission to cancel this payment");
        }

        if (payment.paymentStatus === "cancelled") {
            throw new Error("Payment already cancelled");
        }

        payment.paymentStatus = "cancelled";
        await payment.save();

        // Update order status
        const order = await Order.findById(payment.orderId);
        if (order) {
            order.paymentStatus = "cancelled";
            order.status = "cancelled";
            await order.save();
        }

        res.json({
            message: "Payment cancelled successfully",
            data: payment
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Get payment by order ID
paymentRouter.get("/api/v1/payments/order/:orderId", UserAuth, async (req, res) => {
    try {
        const logginUser = req.user;
        if (!logginUser) {
            throw new Error("Please login");
        }

        const payment = await Payment.findOne({ orderId: req.params.orderId });
        if (!payment) {
            throw new Error("Payment not found for this order");
        }

        // Check if user owns this payment or is admin
        if (payment.customerId.toString() !== logginUser._id.toString() && logginUser.role !== "admin") {
            throw new Error("You don't have permission to view this payment");
        }

        res.json({
            data: payment
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

module.exports = paymentRouter;