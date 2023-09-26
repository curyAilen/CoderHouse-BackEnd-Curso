const express = require ('express');
const path = require ('path');
const ProductManager = require('./src/views/ProductManager');
const fs = require('fs').promises;
const routerMain = require('./src/routes/routerMain');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas
app.get('/', routerMain );



const productManager = new ProductManager('products.json');
app.get ('/products', async (req, res) => {
try{
 const limit = parseInt(req.query.limit);
 await productManager.getProduct();
 let products = JSON.parse(productManager.getProduct());


if (!isNaN(limit)){
    products = products.slice(0, limit);
}
res.json({products});
}
catch(error){
 res.status(500).json({ error: error.message});
}
})

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {      
        await productManager.getProduct();
        const product = productManager.getProductById(productId);
        res.send(product.JSON.parse(product));
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

//Escucha del servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto localhost:${port}`);
});