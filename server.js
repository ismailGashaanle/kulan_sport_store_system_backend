


 const express = require("express")
    const app = express();
 const  ConnectDB = require ('./src/config/database')
 const authRouter = require("./src/routes/auth")
 const profileRouter =require("./src/routes/profile")
 const productRouter = require("./src/routes/StockKeeper/AddProduct")
 const AdminUser = require("./src/routes/AdminRole/AdminUser")
 const inventoryRouter = require("./src/routes/inventory/inventoryRoutes")
 const salesRouter = require("./src/routes/sales/salesRouter")
 const customerRouter = require("./src/routes/customerRouter/customerRouter")
 const orderRouter = require("./src/routes/order/orderRouter")
 
const paymentRouter = require("./src/routes/payment/paymentRouter")
const receiptRouter = require("./src/routes/receipt/receiptRouter")
 const cookieParser = require("cookie-parser")
 const cors= require("cors")
 
app.use(cors(
    {
    origin:"http://localhost:5173",
    credentials: true,
}
))
 app.use(express.json())
 
 app.use(express.urlencoded({extended:true}))
 app.use(cookieParser());
  

 app.use("/",authRouter)
 app.use("/",profileRouter)
 app.use("/",AdminUser)
 app.use("/",productRouter)
 app.use("/",inventoryRouter)
 app.use("/",salesRouter)
 app.use("/",customerRouter)
 app.use("/", orderRouter)
// app.use("/", paymentRouter)
// app.use("/", receiptRouter)
// app.use("/orders", orderRouter)
 
app.use("/orders", orderRouter)
app.use("/payments", paymentRouter)
app.use("/receipts", receiptRouter)

 

 

ConnectDB().then(()=>{

console.log("connected database successfuly")
    
    app.listen(7000,()=>{
     console.log("Server running on port 7000");
      })
 



}).catch((err)=>{
    console.log(err.message)
    console.log("not connected database")
})




