class ProductManager {
    constructor(){
        this.products = [];
        this.autoIncrementId  = 1;
    }

    addProduct(title, description, price,thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            throw new Error('Los campos son obligatorios');
        }
        const productExist =  this.products.find(product =>  product.code === code );
        if(productExist){
            throw new Error('Ya existe un Producto con ese ID')
        }
        const newProduct = {
            id : this.autoIncrementId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)  

        return newProduct
    }

    getProduct(){
        return this.products;
            
    }
    getProductById(id){
        const productIdFind = this.products.find(productFind => productFind.id === id);
        if(!productIdFind){
         return console.error("Not Found");
        }
        return productIdFind
    }
}

const productManager = new ProductManager();

const productAdd1 = productManager.addProduct("Producto 1", "prdocuto agregado en indice 1", 1000, "imagen1.jpg", 1, 5);
console.log ("Producto agregado: ", productAdd1)
productManager.addProduct("Producto 2", "prdocuto agregado en indice 2", 3005, "imagen2.jpg", 2, 30);
console.log("Lista de productos:", productManager.getProduct());
const productEncontrado = productManager.getProductById(2);
console.log("Producto encontrado por ID (se busco el indice 2):", productEncontrado);


//Lineas de código para ejecutar y validar el funcionamiento de los errores//

//Descomentar linea para validar el funcionamiento de los errores. linea 9//
//productManager.addProduct("Producto 5", "prdocuto agregado en indice 3", "imagen.jpg", 1, 5);

//Descomentar linea para validar el funcionamiento de los errores. linea 13//
//productManager.addProduct("Producto 1", "prdocuto agregado en indice 1", 1000, "imagen1.jpg", 1, 5);

//Descomentar linea para validar el funcionamiento de los errores. linea 36//
//const productEncontrado2 = productManager.getProductById(7);
//console.log("Producto encontrado por ID (se busco el indice 7)", productEncontrado2);
