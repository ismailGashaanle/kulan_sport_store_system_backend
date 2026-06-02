const express = require("express");

const inventoryRouter = express.Router();

const Product = require("../../models/products");

const UserAuth = require("../../middleware/auth");


// ======================================================
// GET ALL STOCK
// ======================================================

inventoryRouter.get(
  "/api/v1/inventory/stock",
  UserAuth,
  async (req, res) => {
    try {

        const logginUser= req.user
        if(logginUser.role !=="admin" && 
            logginUser.role  !=="InventoryManager" &&
           logginUser.role  !=="storekeeper"){
            throw new Error("you can't access !! Access denied")
        }
      const products = await Product.find({});

      res.json({
        count: products.length,
        data: products
      });

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);


// ======================================================
// GET SINGLE PRODUCT STOCK
// ======================================================

inventoryRouter.get(
  "/api/v1/inventory/stock/:productId",
  UserAuth,
  async (req, res) => {
    try {

          const logginUser= req.user
        if(logginUser.role !=="admin" && 
            logginUser.role  !=="InventoryManager" &&
           logginUser.role  !=="storekeeper"){
            throw new Error("you can't access !! Access denied")
        }

      const product = await Product.findById(req.params.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      res.json({
        data: product
      });

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);


// ======================================================
// LOW STOCK PRODUCTS
// ======================================================

inventoryRouter.get(
  "/api/v1/inventory/low-stock",
  UserAuth,
  async (req, res) => {
    try {

          const logginUser= req.user
        if(logginUser.role !=="admin" && 
            logginUser.role  !=="InventoryManager" &&
           logginUser.role  !=="storekeeper"){
            throw new Error("you can't access !! Access denied")
        }
      const products = await Product.find({
        quantity: { $lt: 5 }
      });

      res.json({
        count: products.length,
        data: products
      });

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);


// ======================================================
// OUT OF STOCK PRODUCTS
// ======================================================

inventoryRouter.get(
  "/api/v1/inventory/out-of-stock",
  UserAuth,
  async (req, res) => {
    try {

            const logginUser= req.user
        if(logginUser.role !=="admin" && 
            logginUser.role  !=="InventoryManager" &&
           logginUser.role  !=="storekeeper"){
            throw new Error("you can't access !! Access denied")
        }

      const products = await Product.find({
        quantity: 0
      });

      res.json({
        count: products.length,
        data: products
      });

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);


// ======================================================
// TOTAL INVENTORY VALUE
// ======================================================

inventoryRouter.get(
  "/api/v1/inventory/valuation",
  UserAuth,
  async (req, res) => {
    try {

            const logginUser= req.user
        if(logginUser.role !=="admin" && 
            logginUser.role  !=="InventoryManager" &&
           logginUser.role  !=="storekeeper"){
            throw new Error("you can't access !! Access denied")
        }

      const products = await Product.find({});

      let totalInventoryValue = 0;

      products.forEach((item) => {
        totalInventoryValue += item.price * item.quantity;
      });

      res.json({
        totalInventoryValue
      });

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);


// ======================================================
// ADJUST STOCK
// ======================================================

inventoryRouter.post(
  "/api/v1/inventory/adjust",
  UserAuth,
  async (req, res) => {
    try {

      const logginUser = req.user;

      if (
        logginUser.role !== "admin" &&
        logginUser.role !== "InventoryManager" &&
        logginUser.role !== "storekeeper"
      ) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      const { productCode, quantity } = req.body;

      // FIX HERE 👇
      const product = await Product.findOne({ productCode });

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      product.quantity += quantity;

      // auto status update
      if (product.quantity <= 0) {
        product.quantity = 0;
        product.status = "out_stock";
      } else {
        product.status = "in_stock";
      }

      await product.save();

      res.json({
        message: "Stock adjusted successfully",
        data: product
      });

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);


module.exports = inventoryRouter;