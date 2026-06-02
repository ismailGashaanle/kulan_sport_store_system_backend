
const express = require ("express");
const UserAuth = require("../../middleware/auth");
const Sales = require("../../models/sales")
const Product = require("../../models/products")

const salesRouter = express.Router();



salesRouter.post("/api/v1/create/sales",UserAuth,async(req,res)=>{

     
    try{
  
        const { productCode, quantity, customerName,price, paymentMethod ,productName} = req.body

        const product = await Product.findOne({productCode})
        if(!product){
            throw new Error("not found product")
        }

        if(product.quantity <quantity){
            throw new Error("Not enough stock")
        }
        
        const totalAmount = product.price *quantity;
        const sales= await  new  Sales({
            productCode, 
            productName,
            quantity, 
            customerName,
            price:product.price,
            totalAmount:totalAmount,
            paymentMethod
       })

       product.quantity -= quantity
       if (product.quantity <= 0) {
            product.status = "out_stock";
        }

        await sales.save();
        await product.save();

    //    const salesModel = await Sales.findOne({})
    //     const product = await  Product.findOneAndUpdate({
    //     quantity:quantity-salesModel.quantity
    //    })

       res.json({
            message: "Sale created successfully",
            data: sales
        });

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})

salesRouter.get("/api/search/product/:productCode",UserAuth,async(req,res)=>{


    try{

        const {productCode}=req.params
       const product = await Product.findOne({productCode});

        if(!product){
            throw new Error("not found product")
         }
        
         if(product.quantity === 0){
            res.json({
                message:"quantity is 0 so this product was empty"
            })
         }

         res.json({
            message:`the product  quantity is ${product.quantity} `,
            count:product.length,
            data:product
         })


    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})


salesRouter.delete("/api/sales/delete/:id",UserAuth,async(req,res)=>{


    try{
        const {id}=req.params;
        const sales= await Sales.findByIdAndDelete(id);
        if(!sales){
            throw new Error("not found to delete this sales")
        }

        res.json({
            message:"successfuly deleted sales product"
        })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})


salesRouter.get("/api/v1/sales/:date",UserAuth,async(req,res)=>{
    try{
        const {date}=req.params
      
       
         
        if(!date){
            throw new Error("not found sales this date")
        }
        
         // start of day
        const startDate = new Date(date);
        startDate.setHours(0,0,0,0);

        // end of day
        const endDate = new Date(date);
        endDate.setHours(23,59,59,999);

        const sales = await Sales.find(
             { createdAt: {
                $gte: startDate,
                $lte: endDate
            }}
        )

         if (sales.length === 0) {
            throw new Error("not found sales this date");
        }
     
    res.json({
         count: sales.length,
        data:sales
    })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})


salesRouter.get("/api/v1/sale/receipt/:id",UserAuth,async(req,res)=>{

    try{

        const {id}=req.params
        const sales= await Sales.findOne({_id:id}).select([ "customerName","productCode","productName",
            "category","price","quantity","createdAt","paymentMethod"]);

        if(!sales){
            throw new Error("not found this customer sales_ID")
        }

        const totalAmount = sales.price * sales.quantity
        res.json({
            data:sales,
            cost:totalAmount

        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})

salesRouter.get("/api/v1/Get/All/Sales",UserAuth,async(req,res)=>{

    try{

        const sales= await Sales.find();

        if(sales.length <0 || !sales){
          throw new Error("not found any sales")
        }

        res.json({
            count : sales.length,
            data:sales
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})

salesRouter.patch("/api/v1/sales/update/sales/:_id",UserAuth,async(req,res)=>{

    try{

        const {productCode,productName,price,quantity,customerName,paymentMethod,totalAmount}=req.body

        const {_id}=req.params
        const sales = await Sales.findByIdAndUpdate(_id,{
            productCode,
            productName,
            price,
            quantity,
            customerName,
            paymentMethod,
            totalAmount
        })

    //    await Sales.find()
        res.json({
            message:"successfully update sales",
            data:sales
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }

})

module.exports=salesRouter