const mongoose = require("mongoose");

const express = require("express");
const UserAuth = require("../../middleware/auth");
const Product = require("../.././models/products")


const productRouter = express.Router();


productRouter.post("/api/v1/stockKeeper/addProduct",UserAuth,async(req,res)=>{

    

    try{

        const logginuser = req.user;
        if(logginuser.role !=="storekeeper"){
            throw new Error("access denied only can Access storekeeper")
        }
       

        const {productName,category,Brand,price,quantity,description,status,productImage,productCode}=req.body
        const  product = await  new Product({
        productName,
        category,
        Brand,
        price,
        quantity,
        description,
        status,
        productImage,
        productCode
        })

        const extingproduct = await Product.findOne({productCode:req.body.productCode})
        if(extingproduct){
            throw new Error("al ready exit productCode")
        }

        await product.save();

        res.json({
            data:product
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }


})



productRouter.patch("/api/v1/stockKeeper/updateProduct/:productid",UserAuth,async(req,res)=>{
    try{

        const logginUser=req.user;
           
    if(logginUser.role !== "storekeeper"){
        throw new Error("access denied only Can Access storekeeper")
    }
        const prod= await Product.findOne({})
        const {  productName,
        category,
        Brand,
        price,
        quantity,
        description,
        status,
        productImage,
        productCode} =req.body;

         const {productid}=req.params

        const product = await Product.findByIdAndUpdate(productid,{
        productName,
        category,
        Brand,
        price,
        quantity,
        description,
        status,
        productImage,
        productCode
        })
        await product.save();

        res.json({
            message:"successfully updated product " + product.productName,
            data:product
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})


productRouter.get("/api/v1/stockKeeper/GetProducts",UserAuth,async(req,res)=>{
    try{
          const logginUser=req.user;
    if(logginUser.role !=="storekeeper"){
        throw new Error("access denied only Can Access storekeeper")
    }
        const product = await Product.find({});

        if(!product){
            throw new Error("not found products")
        };

        res.json({
            count:product.length,
            data:product
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})

productRouter.get("/api/v1/stockKeeper/products", UserAuth, async (req, res) => {
  try {

    const logginUser=req.user
    if(logginUser.role !== "storekeeper"){
        throw new Error("access denied only Can Access storekeeper")
    }

{
   /*
   
   GET /products?category=Sports
2. Only search
GET /products?search=nike
3. Both together
GET /products?category=Sports&search=nike
   */
}
    const { category, search } = req.query;

    let filter = {};

    // category filter
    if (category) {
      filter.category = category;
    }

    // search filter
    if (search) {
      filter.productName = {
        $regex: search,
        $options: "i"
      };
    }

    const products = await Product.find(filter);

    res.json({
      count: products.length,
      data: products
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


productRouter.delete("/api/v1/stockKeeper/product/id/:id",UserAuth,async(req,res)=>{

    try{

        const {id}=req.params
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            throw new Error("not found products")
        }

        res.json({
            message:"successfuly deleted product"
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})



module.exports=productRouter

 