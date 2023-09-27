const express = require("express");
const router = express.Router();
const path = require("path");
//const ProductManager = require('./src/views/ProductManager');
//const fs = require('fs').promises;

router.get("/", (req, res) => {  
  res.render("inicio", { title: "Inicio" });
});

router.get("/servicios", (req, res)=>{
  res.render("servicios", { title: "Servicios" })
});

module.exports = router;
