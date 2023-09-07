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
        return this.products
            
    }
    getProductById(id){
        const productIdFind = this.products.find(productFind => productFind.id === id);
        if(!productIdFind){
            console.log("porducto no encontrado")
        }
        return
    }
}