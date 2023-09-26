const fs = require('fs');
class ProductManager { 
    constructor() {
        this.path = 'products.json';
        this.products = [];
        this.autoIncrementId = 1;
    }    
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Los campos son obligatorios');
        }
        const productExist = this.products.find(product => product.code === code);
        if (productExist) {
            throw new Error('Ya existe un Producto con ese ID')
        }
        const newProduct = {
            id: this.autoIncrementId++,
            title,
            description, 
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct);
        this.saveProduct();
        return JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
    }
    saveProduct() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }    
    getProduct(){
        return fs.readFileSync(this.path, 'utf-8') || [];
    }    
    getProductById(id) {
        const data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const productIdFind = data.find(productFind => productFind.id === id);
        if (!productIdFind) {
            return console.error("Not Found");
        }
        return productIdFind;
    }   
    
    updateProduct(id, updateData) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('El producto no fue encontrado.');
        }
        updateData.id = this.products[productIndex].id;
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updateData
        };
        this.saveProduct();
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('El producto no fue encontrado.');
        }
        this.products.splice(productIndex, 1);
        this.saveProduct();
    }
 
}
module.exports = ProductManager;
////////////////////// T E S T E R /////////////////////// 
/*
const productManager = new ProductManager();
const product1 = productManager.addProduct("Producto 1", "prdocuto agregado en indice 1", 1000, "imagen1.jpg", 10, 5);
const product2 = productManager.addProduct("Producto 2", "prdocuto agregado en indice 2", 1005, "imagen0.jpg", 20, 5);
const product3 = productManager.addProduct("Producto 3", "prdocuto agregado en indice 3", 3050, "imagen12.jpg", 30, 30);
const product4 = productManager.addProduct("Producto 4", "prdocuto agregado en indice 4", 3005, "imagen12.jpg", 40, 30);
const product5 = productManager.addProduct("Producto 5", "prdocuto agregado en indice 5", 1000, "imagen1.jpg", 50, 5);
const product6 = productManager.addProduct("Producto 6", "prdocuto agregado en indice 6", 1077, "imagen0.jpg", 60, 5);
const product7 = productManager.addProduct("Producto 7", "prdocuto agregado en indice 7", 300, "imagen12.jpg", 70, 30);
const product8 = productManager.addProduct("Producto 8", "prdocuto agregado en indice 8", 4587, "imagen12.jpg", 80, 30);
console.log("Productos Agregados", product1,product2, product3)
const productEncontrado = productManager.getProductById(4);
console.log("Producto encontrado por ID:", productEncontrado);
const updateProdut = productManager.updateProduct(2, {title: 'Producto actualizado', description: "Nueva información actulizada y precio", price: 55400});
console.log('Producto actualizado:', updateProdut);
productManager.deleteProduct(4);
console.log('Producto eliminado con ID 4 y traigo todos los productos:', productManager.getProduct());

*/