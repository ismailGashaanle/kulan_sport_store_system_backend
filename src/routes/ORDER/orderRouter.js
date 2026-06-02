
const express = require("express");
const UserAuth = require("../../middleware/auth");
const Order = require("../../models/Order");
const OrderItem = require("../../models/OrderItem");
const Product = require("../../models/products");
const Payment = require("../../models/PAYMENT.js")

const orderRouter = express.Router();


// In orderRouter.js - With delivery
orderRouter.post("/api/v1/order/create/:productid", UserAuth, async (req, res) => {
    try {
        const logginUser = req.user;
        const { quantity, address, delivery } = req.body;
        const { productid } = req.params;

        // Validations
        if (!quantity) throw new Error("quantity is required");
        if (!address) throw new Error("address is required");
        if (!delivery) throw new Error("delivery is required");
        if (!address.street) throw new Error("street is required");
        if (!address.city) throw new Error("city is required");
        if (!address.country) throw new Error("country is required");
        if (!delivery.fullName) throw new Error("delivery fullName is required");
        if (!delivery.phone) throw new Error("delivery phone is required");
        if (!delivery.deliveryDate) throw new Error("deliveryDate is required");

        const product = await Product.findById(productid);
        if (!product) throw new Error("product not found");
        if (quantity > product.quantity) throw new Error(`Only ${product.quantity} items available`);

        const totalAmount = product.price * quantity;

        const order = new Order({
            customerId: logginUser._id,
            items: [{ productId: productid, quantity, price: product.price }],
            totalAmount,
            paymentStatus: "pending",
            status: "pending",
            address,
            delivery  // Include delivery
        });

        await order.save();
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});


//create order 
//update order 
//get my order
//find date order
// cancel order
// updare order 

/*  Customer APIs:
  POST   /orders
  GET    /orders/my
  GET    /orders/my/:id
  PATCH  /orders/:id/cancel
  POST   /orders/:id/pay  */

// orderRouter.post("/api/v1/order/create/:productid",UserAuth,async(req,res)=>{

//     try{

//         const logginUser = req.user;
//         if(!logginUser){
//          throw new Error("not makes order please login")
//         }
//         if(logginUser.role !=="user"){
//             throw new Error("you'r not have permision to make order")
//         }

//         const {customerId,items,quantity,price,productId,
//             totalAmountm,paymentStatus,status,address,delivery}=req.body

//             const {productid}=req.params
//             const product = await Product.findOne({_id:productid})

//             if(!product){
//                 throw new Error("not found this product")
//             }
            
//             // const productPaidPayment=await Payment.find({orderId:productid})
//             // if(productPaidPayment){
//             //     throw new Error("al ready exit payment order means you pay  payment this product")
//             // }

//             const totalAmount= product?.price * quantity 
//             if(quantity  >product.quantity){
//                 throw new Error(`this product we have only ${product.quantity} quantity   `)
//             }
//         const order = await new  Order({
//             customerId:logginUser._id,
//             items:[
//                 {
//                     productId:productid,
//                     quantity,
//                      price:product?.price,
//                 }
//             ],
            
           
//             totalAmount:totalAmount,
//             paymentStatus: "pending",
//             status: "pending",
//             address,
//             delivery
//         })

//         await order.save();

//         res.json({
//             data:order
//         })

//     }catch(err){
//         res.json({
//             message:err.message
//         })
//     }

// })


// orderRouter.get("/api/v1/my/order",UserAuth,async(req,res)=>{
//     try{
        
//          const logginUser = req.user;
//         if(!logginUser){
//          throw new Error("not makes order please login")
//         }

//         if(logginUser.role !=="user"){
//             throw new Error("you'r not have permision to make order")
//         }

//         const MyOrder= await  Order.find({customerId:logginUser._id}).populate("items.productId");
//         if(!MyOrder){
//             throw new Error("not found your order")
//         }

//         res.json({
//             count:MyOrder.length,
//             message:"All list your Orders",
//             data:MyOrder
//         })


//     } catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }
// })

orderRouter.post(
  "/api/v1/order/create/:productid",
  UserAuth,
  async (req, res) => {

    try {

      const logginUser = req.user;

      if (!logginUser) {
        throw new Error("please login");
      }

      if (logginUser.role !== "user") {
        throw new Error("you don't have permission");
      }

      const {
        quantity,
        address,
        delivery,
      } = req.body;

      const { productid } = req.params;

      // VALIDATIONS

    //   if (quantity > product.quantity) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Only X items available"
    //     });
    //     }

      if (!quantity) {
        throw new Error("quantity is required");
      }

      if (!address) {
        throw new Error("address is required");
      }

      if (!delivery) {
        throw new Error("delivery is required");
      }

      if (!address.street) {
        throw new Error("street is required");
      }

      if (!address.city) {
        throw new Error("city is required");
      }

      if (!address.country) {
        throw new Error("country is required");
      }

      if (!delivery.fullName) {
        throw new Error("fullName is required");
      }

      if (!delivery.phone) {
        throw new Error("phone is required");
      }

      if (!delivery.deliveryDate) {
        throw new Error("deliveryDate is required");
      }

      const product = await Product.findById(productid);

      if (!product) {
        throw new Error("product not found");
      }

      if (quantity > product.quantity) {
        throw new Error(
          `Only ${product.quantity} items available`
        );
      }

      const totalAmount = product.price * quantity;

      const order = new Order({

        customerId: logginUser._id,

        items: [
          {
            productId: productid,
            quantity,
            price: product.price,
          },
        ],

        totalAmount,

        paymentStatus: "pending",

        status: "pending",

        address,

        delivery,

      });

      await order.save();

      res.status(201).json({
        success: true,
        data: order,
      });

    } catch (err) {

      res.status(400).json({
        success: false,
        message: err.message,
      });

    }
  }
);

orderRouter.get("/api/v1/my/order", UserAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Please login first"
      });
    }

    if (user.role !== "user") {
      return res.status(403).json({
        message: "You don't have permission to view orders"
      });
    }

    const orders = await Order.find({
      customerId: user._id
    }).populate("items.productId");

    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found"
      });
    }

    return res.json({
      count: orders.length,
      message: "All your orders",
      data: orders
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
});


orderRouter.get("/api/v1/get/order/Date/:date",UserAuth,async(req,res)=>{

    try{

         const {date}=req.params
           // start of day
        const startDate = new Date(date);
        startDate.setHours(0,0,0,0);

        // end of day
        const endDate = new Date(date);
        endDate.setHours(23,59,59,999);

       
        const order = await Order.find({
           createdAt:{
               $gte: startDate,
                $lte: endDate
            }
        })


        if(!order){
            throw new Error("not found any orders")
        }
        if(order.length ===0){
            throw new Error("not found any orders")
        }

        res.json({
            count:order.length,
            message:"successful gets order",
            data:order
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})


orderRouter.delete("/api/v1/orders/cancel/:id",UserAuth,async(req,res)=>{

    try{

           const logginUser = req.user;
        if(!logginUser){
         throw new Error("not makes order please login")
        }

        if(logginUser.role !=="user"){
            throw new Error("you'r not have permision to make order")
        }
        const {id}=req.params;

        const order = await Order.findByIdAndDelete(id);
        if(!order){
            throw new Error("not found this order to cancel")
        }

        res.json({
            message:"successfully cancel order"
        })

    }catch(err){
        res.json({
            message:err.message
        })
    }

})


orderRouter.delete("/api/v1/orders/cancel/all/order",UserAuth,async(req,res)=>{

    try{

           const logginUser = req.user;
        if(!logginUser){
         throw new Error("not makes order please login")
        }

        if(logginUser.role !=="user"){
            throw new Error("you'r not have permision to make order")
        }
         let customerId=logginUser._id

        // const order = await Order.deleteMany({customerId:customerId});
           const order = await Order.deleteMany({ customerId: customerId });
        if(!order){
            throw new Error("not found this order to cancel")
        }

        res.json({
            message:"successfully cancel order"
        })

    }catch(err){
        res.json({
            message:err.message
        })
    }

})



orderRouter.get("/api/v1/orders/payment/paid",UserAuth,async(req,res)=>{

    try{
   const logginUser = req.user;
        if(!logginUser){
         throw new Error("not makes order please login")
        }

        if(logginUser.role !=="user"){
            throw new Error("you'r not have permision to make order")
        }

        const order = await Order.find({
           paymentStatus:"paid" 
        })
        

        if(!order){
            throw new Error('not found payment Order paid')
        }
        if(order.length ===0){
            throw new Error('not found payment Order paid')
        }
        // const paidPaymentOrder = order.paymentStatus

        // if(paidPaymentOrder !=="paid"){
        //     throw new Error("not paid payment")
        // }

        res.json({
            data:order
        })
    }catch(err){
        res.json({
            message:err.message
        })
    }

})




// orderRouter.post("/api/v1/order/create", UserAuth, async (req, res) => {
//   try {
//     const { items } = req.body;
//     const logginUser= req.user;
//     if(logginUser.role !=="user"){
//         throw new Error("you can't make oder ")
//     }

//     let total = 0;

//     const order = await Order.create({
//       customerId:logginUser._id,
//       status: "pending",
//       paymentStatus: "unpaid",
//       totalAmount: 0
//     });

//     for (let item of items) {
//       const product = await Product.findById(item.productId);

//       if (!product) throw new Error("Product not found");
//       if (product.quantity < item.quantity)
//         throw new Error("Not enough stock");

//       const subtotal = product.price * item.quantity;

//       total += subtotal;

//       await OrderItem.create({
//         orderId: order._id,
//         productId: product._id,
//         productCode: product.productCode,
//         productName: product.productName,
//         price: product.price,
//         quantity: item.quantity,
//         subtotal
//       });

//       product.quantity -= item.quantity;
//       if (product.quantity === 0) product.status = "out_stock";

//       await product.save();
//     }

//     order.totalAmount = total;
//     await order.save();

//     res.json({
//       message: "Order created successfully",
//       data: order
//     });

//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });



// orderRouter.get("/api/v1/order/:id", UserAuth, async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   const items = await OrderItem.find({ orderId: order._id });

//   res.json({
//     order,
//     items
//   });
// });



// orderRouter.delete("/api/v1/order/cancel/:id", UserAuth, async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) throw new Error("Order not found");

//   order.status = "cancelled";
//   await order.save();

//   res.json({ message: "Order cancelled" });
// });








module.exports=orderRouter