const express = require("express");
const UserAuth = require("../../middleware/auth");
const Product = require("../../models/products");
const Order = require("../../models/Order");

const customerRouter = express.Router();

/*

View products
Create order (checkout)
Pay order
View order history

*/

// customerRouter.get("/api/v1/product/view",async(req,res)=>{

//     try{

//         const product = await Product.find().select(["productName","category","price", "brand", "quantity","productImage"]);

//         if(!product){
//             throw new Error ("Not found Product")
//         }

//         res.json({
//             data:product
//         })

//     }catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }

// })

customerRouter.get("/api/v1/product/view", async (req, res) => {
  try {

    
    const product = await Product.find({
      quantity: { $gt: 0 }
    }).select([
      "productName",
      "category",
      "price",
      "brand",
      "quantity",
      "productImage",
    ]);

    return res.json({
      data: product,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// customerRouter.get("/api/v1/products/search",async(req,res)=>{

//     try{
//         const { q } = req.query;

//         const products = await Product.find({
//             productName: { $regex: q, $options: "i",
                
//            quantity: { $gt: 0 },
                
//              }
//         });


//   if(!products){
//     throw new Error("not found this product")
//   }


//   res.json({
//      count: products.length,
//     data:products
//   })
  
//     }
//     catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }
// })


customerRouter.get("/api/v1/products/search", async (req, res) => {

  try {

    const q = req.query.q;

    console.log("Search endpoint requested!");

    // validate search
    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search text required",
      });
    }

    // search products
    const products = await Product.find({
      productName: {
        $regex: q,
        $options: "i",
      },

      // only products in stock
      quantity: {
        $gt: 0,
      },
    });

    // no products
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

}); 
customerRouter.get("/api/v1/product/details/:id",async(req,res)=>{

    try{

        const {id}=req.params
        // const product = await Product.findOne({_id:id
        //       quantity: { $gt: 0 },
        // })

          const product = await Product.findOne({
      _id: id,
      quantity: { $gt: 0 },
    });


        if (!product) {
        return res.status(404).json({
            message: "Product not available or out of stock",
            data: null,
        });
        }

        res.json({
            data:product
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})
 

module.exports=customerRouter