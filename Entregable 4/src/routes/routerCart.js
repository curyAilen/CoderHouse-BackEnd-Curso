const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/cart", (req, res) => {  
  res.render("cart", { title: "Carrito" });
});


module.exports = router;
