
const mongoose = require("mongoose");

const  validator =require("validator")


const productSchema=  new mongoose.Schema({

    productCode: {
      type: String,
      required: [true, "Please fill product code"],
      unique: true,
      trim: true,
      uppercase: true
   },

    productName:{
        type:String,
        required:[true,"please fill productName"],
        lowercase:true
    },

     category: {
      type: String,
       lowercase:true
     },

     Brand:{
        type:String,
     },

     price:{
        type:Number,
        required:true
     },
     quantity:{
         type: Number,
         default: 0
     },

      description: {
      type: String,
      default:"This is a high-quality product designed to meet your needs with excellent performance and durability"
     },

       status: {
    type: String,
    enum: ["in_stock", "out_stock"],
    default: "in_stock"
    },

    productImage:{
        type:String,
        required:true,
        default:"https://tiimg.tistatic.com/fp/1/007/674/comfortable-shrink-resistance-short-sleeves-round-neckline-man-s-sports-t-shirt-503.jpg"
    }



},{timestamps:true})


// db.products.createIndex({ productCode: 1 }, { unique: true })
const Product = mongoose.model("Product",productSchema);

module.exports=Product