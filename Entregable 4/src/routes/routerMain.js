const express = require("express");
const router = express.Router();
const path = require("path");
const ProductManager = require('./src/views/ProductManager');
const fs = require('fs').promises;

router.get("/", (req, res) => {
  
  res.render("inicio", { title: "Inicio" });
});
router.get("/servicios", (req, res)=>{
    const productManager = new ProductManager("products.json");
  app.get("/products", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      await productManager.getProduct();
      let products = JSON.parse(productManager.getProduct());

      if (!isNaN(limit)) {
        products = products.slice(0, limit);
      }
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
})

module.exports = router;
