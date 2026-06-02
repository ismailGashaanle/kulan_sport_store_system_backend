

// const express = require("express");
// const UserAuth = require("../../middleware/auth");
// const Order = require("../../models/Order")
// const Product = require("../../models/products")
// const Payment = require("../../models/PAYMENT")
// const Receipt = require("../../models/Receipt")


// const receiptRouter = express.Router();


// /*
// Method	Endpoint	Purpose
// GET	/api/v1/receipts/my	Get my receipts
// GET	/api/v1/receipts/:receiptId	Get single receipt
// GET	/api/v1/receipts/order/:orderId	Get receipt by order
// GET	/api/v1/receipts/payment/:paymentId	Get receipt by payment
// GET	/api/v1/receipts/download/:receiptId	Download PDF receipt
// */


// // receiptRouter.post("/api/v1/add/receipt"/UserAuth,async(req,res)=>{


// //     try{
    
// //              const logginUser = req.user;
// //         if(!logginUser){
// //          throw new Error("not makes order please login")
// //         }

// //         if(logginUser.role !=="user"){
// //             throw new Error("you'r not have permision to make order")
// //         }




// //         const order = await Order.findOne({})

        


// //     }catch(err){
// //         res.json({
// //             message:err.message
// //         })
// //     }

// // })


 
 

// module.exports=receiptRouter






const express = require("express");
const UserAuth = require("../../middleware/auth");
const Receipt = require("../../models/Receipt");

const receiptRouter = express.Router();



//find and get my receipt or all my receipt

   receiptRouter.get("/api/v1/get/my/receipt",UserAuth,async(req,res)=>{

    try{
        const logginUser=req.user;

        if(logginUser.role !=="admin" && logginUser.role !=="user"){
            throw new Error("you can't have permision to Access")
        }

        let customerUserId = logginUser._id
      const receipt = await Receipt.find(
      { customerUserId:customerUserId}
       ).select(["transactionNo","orderId","customerName","amount",
        "paymentMethod","paymentStatus","date","createdAt"
       ]);

       res.json({
        data:receipt
       })

    }catch(err){
        res.json({
            message:err.message
        })
    }

   })


   //get my receit single 

   receiptRouter.get("/api/v1/get/my/One/receipt/:receiptId",UserAuth,async(req,res)=>{

    try{

        const logginUser= req.user;
        if(logginUser.role !=="admin" && logginUser.role !=="user"){
            throw new Error("you can't have permision to Access this")
        }
        const {receiptId}=req.params

        const receipt = await Receipt.findById(receiptId).populate({
                path: "customerUserId",
                select: "fullName email phone"
                })

            .populate({
            path: "transactionNo",
            select: "amount paymentMethod paymentStatus createdAt"
            })

                .populate({
                path: "orderId",
                select: "items totalAmount address delivery status"
                });
        // const receipt = await Receipt.findById(receiptId).populate("customerUserId").populate("transactionNo").populate("orderId");
        if(!receipt){
            throw new Error("not found this receipt")
        }

        res.json({
            data:receipt
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

   })


//    receiptRouter.get("/api/v1/get/receipt/by/date/:date",UserAuth,async(req,res)=>{

//     try{

//         // check user login in to match user cusstomer

//         const logginUser=req.user
//         const {date}=req.params

//           const startDate = new Date(date)
//             startDate.setHours(0, 0, 0, 0)

//             // end of day
//             const endDate = new Date(date)
//             endDate.setHours(23, 59, 59, 999)

//       const datedRceiptPay = await Receipt.findOne({
//         customerUserId:logginUser,
//         createdAt: {
//         $gte: startDate,
//         $lte: endDate
//       }
//        })
  
//       res.json({
//         data:datedRceiptPay
//       })


//     }catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }


//    })


receiptRouter.get("/api/v1/get/receipt/by/date/:date",UserAuth,async(req,res)=>{

    try{

        // check user login in to match user cusstomer

        const logginUser=req.user
        const {date}=req.params

        

        let filter = {
          customerUserId:logginUser
        }

        // SINGLE DATE
        if(date && !date.includes("_")){

          const startDate = new Date(date)
          startDate.setHours(0,0,0,0)

          const endDate = new Date(date)
          endDate.setHours(23,59,59,999)

          filter.createdAt = {
            $gte:startDate,
            $lte:endDate
          }
        }

        // DATE RANGE
        if(date.includes("_")){

          const [start,end] = date.split("_")

          const startDate = new Date(start)
          startDate.setHours(0,0,0,0)

          const endDate = new Date(end)
          endDate.setHours(23,59,59,999)

          filter.createdAt = {
            $gte:startDate,
            $lte:endDate
          }
        }

         if(!filter){
        throw new Error("not foud this receipt")
      }

      const datedRceiptPay = await Receipt.find(filter)

      if(!datedRceiptPay){
        throw new Error("not found this receipt")
      }
  
      res.json({
        data:datedRceiptPay
      })


    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }


})

// // GET MY RECEIPTS
// receiptRouter.get(
//   "/api/v1/receipts/my",
//   UserAuth,
//   async (req, res) => {

//     try {

//       const logginUser = req.user;

//       const receipts = await Receipt.find({
//         customerId: logginUser._id
//       })
//       .populate("orderId")
//       .populate("paymentId");

//       res.json({
//         count: receipts.length,
//         data: receipts
//       });

//     } catch (err) {

//       res.status(500).json({
//         message: err.message
//       });

//     }

//   }
// );


// // GET SINGLE RECEIPT
// receiptRouter.get(
//   "/api/v1/receipts/:receiptId",
//   UserAuth,
//   async (req, res) => {

//     try {

//       const { receiptId } = req.params;

//       const receipt = await Receipt.findById(receiptId)
//         .populate("orderId")
//         .populate("paymentId");

//       if (!receipt) {
//         return res.status(404).json({
//           message: "Receipt not found"
//         });
//       }

//       res.json({
//         data: receipt
//       });

//     } catch (err) {

//       res.status(500).json({
//         message: err.message
//       });

//     }

//   }
// );


// // GET RECEIPT BY ORDER
// receiptRouter.get(
//   "/api/v1/receipts/order/:orderId",
//   UserAuth,
//   async (req, res) => {

//     try {

//       const { orderId } = req.params;

//       const receipt = await Receipt.findOne({
//         orderId
//       });

//       if (!receipt) {
//         return res.status(404).json({
//           message: "Receipt not found"
//         });
//       }

//       res.json({
//         data: receipt
//       });

//     } catch (err) {

//       res.status(500).json({
//         message: err.message
//       });

//     }

//   }
// );

module.exports = receiptRouter;

