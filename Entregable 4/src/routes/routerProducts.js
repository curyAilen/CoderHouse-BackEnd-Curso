const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require("path");
const pathProducts = path.join(__dirname, '../../products.json');
const fileProducts = JSON.parse(fs.readFileSync(pathProducts));
const ProductManager = require('../views/ProductManager');
const productManager = new ProductManager(fileProducts);

let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));


router.get('/create', (req, res) => {  
  res.render("create", { title: "crear producto" });
});


router.post('/create', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const existingProduct = products.find(product => product.code === code);
    if (existingProduct) {
        return res.status(400).json({ error: 'Ya existe un producto con este código' });
    }
    const id = products.length + 1;

    const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails: thumbnails.split(','),
    };

    products.push(newProduct);
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    res.redirect('/', {product: newProduct });
});
  /*
  let productoNuevo = {
    id: generateId(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
    talle: talles,
    precio: req.body.precio,
    imagen: req.file.filename
  }
  
  dataproductos.push(productoNuevo);
  fs.writeFileSync(pathproductos, JSON.stringify(dataproductos));
  
  res.redirect('/')*/

  
  module.exports = router;