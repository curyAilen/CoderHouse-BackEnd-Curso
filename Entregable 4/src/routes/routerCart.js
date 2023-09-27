const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require("path");


router.get('/', (req, res) => {  
  res.render("cart", { title: "Carrito" });
});

module.exports = router;
