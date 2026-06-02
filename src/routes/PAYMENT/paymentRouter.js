const express = require("express");
const UserAuth = require("../../middleware/auth");
const Payment = require("../../models/payment");
const Order = require("../../models/Order");
const Receipt = require("../../models/Receipt");
const Product = require("../../models/products");

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

paymentRouter.post("/api/v1/payments/:orderId",UserAuth,async(req,res)=>{

    try{

           const logginUser = req.user;
        if(!logginUser){
         throw new Error("not makes order please login")
        }

        if(logginUser.role !=="user"){
            throw new Error("you'r not have permision to make order")
        }
        const {orderId}=req.params;
   const {customerId,amount,paymentStatus,paymentMethod,customerName,customerUserId,transactionNo}=req.body
      
        const order = await Order.findById(orderId)
        if(!order){
            throw new Error("not found order")
        }

        const checkorderIdByPayment= await Payment.findOne({orderId:orderId})
        if(checkorderIdByPayment){
            throw new Error("al ready you payment")
        }
     

        const payment=  new Payment({
   
            orderId:orderId,
            customerId:logginUser._id,
            amount:order.totalAmount,
            paymentStatus:"completed",
            paymentMethod,

        })

        for (const item of order.items) {

  const product = await Product.findById(item.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // check stock
  if (product.quantity < item.quantity) {
    throw new Error(
      `${product.productName} does not have enough stock`
    );
  }

  // reduce quantity
  product.quantity -= item.quantity;

  // update stock status
  if (product.quantity <= 0) {
    product.status = "out_stock";
  }

  await product.save();

}

        
      
     

        await payment.save();

      const receipt = await Receipt.create({

                transactionNo: payment._id,
                customerName:logginUser.fullName,

                orderId: order._id,
                customerUserId:logginUser._id,

                paymentId: payment._id,

                customerId: logginUser._id,

                amount: payment.amount,

                paymentMethod: payment.paymentMethod,

                paymentStatus: payment.paymentStatus,

                date: Date.now()
  

});

         order.paymentStatus = "paid";
        order.status = "confirmed";

        await order.save();


        res.json({
            message:"successfuly payment paid",
            data:payment
        })




    }catch(err){
        res.json({
            message:err.message
        })
    }

})


paymentRouter.get("/api/v1/my/payment",UserAuth,async(req,res)=>{
    try{
             const logginUser = req.user;
        if(!logginUser){
         throw new Error("not makes order please login")
        }

        if(logginUser.role !=="user"){
            throw new Error("you'r not have permision to make order")
        }

        const payment= await Payment.find()
       let customerId = payment.customerId;
          const  myPayment= await Payment.find({customerId:logginUser._id})
        if(!myPayment){
            throw new Error("not found your payment")
        }

        res.json({
            count:myPayment.length,
            data:myPayment
        })


    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})






// paymentRouter.post("/api/v1/payment/pay/:orderId", UserAuth, async (req, res) => {
//   try {
//     const { paymentMethod } = req.body;

//     const order = await Order.findById(req.params.orderId);

//     if (!order) throw new Error("Order not found");
//     const logginUser= req.user

//     const payment = await Payment.create({
//       orderId: order._id,
//       customerId: logginUser._id,
//       amount: order.totalAmount,
//       paymentMethod,
//       paymentStatus: "completed"
//     });

//     order.paymentStatus = "paid";
//     order.status = "paid";

//     await order.save();

//     res.json({
//       message: "Payment successful",
//       data: payment
//     });

//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });



// paymentRouter.get("/api/v1/payment/my", UserAuth, async (req, res) => {
//   const payments = await Payment.find({ customerId: req.user._id });

//   res.json({
//     count: payments.length,
//     data: payments
//   });
// });



// paymentRouter.get("/api/v1/payment/order/:orderId", UserAuth, async (req, res) => {
//   const payment = await Payment.findOne({ orderId: req.params.orderId });

//   res.json({ data: payment });
// });






module.exports=paymentRouter