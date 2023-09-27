const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require("path");
const pathProducts = path.join(__dirname, '../../products.json');
const fileProducts = JSON.parse(fs.readFileSync(pathProducts));
const ProductManager = require('../views/ProductManager');
const productManager = new ProductManager(fileProducts);

router.get("/", (req, res) => {   
  try{
    const limit = parseInt(req.query.limit);
    productManager.getProduct();
    let products = JSON.parse(productManager.getProduct());  
   if (!isNaN(limit)){
       products = products.slice(0, limit);
   }
   res.render("inicio", { 
    title: "Inicio", 
    productsFind: fileProducts})
   }
   catch(error){
    res.status(500).json({ error: error.message});
}
});


module.exports = router;
