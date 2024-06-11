import express from "express"
import {promises as fs} from "fs"

export class ProductManager{

    constructor(){
        this.path = "/products"
        this.products = []
    }

    addProduct = async ({title, description, code, price, status, stock, category, thumbnails, id}) => {
        const newProduct = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
            id
        }
        if (this.products.length>0){
            newProduct.id = this.products[this.products.length-1].id+1;
        }else{
            newProduct.id = 1;
        }

        this.products = await this.products()
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }

    getProducts = async () =>{
        const response = await fs.readFile (this.path, "utf-8")
        const responseJSON = JSON.parse(response) 

        return responseJSON;
    }

    getProductsById = async (id) => {
        const responseId = this.getProducts()
        const product = responseId.find(product => product.id === id)

        if(product){
            return product
        }else{
            console.log("Producto fuera de stock")
        }
    }
    
    updateProduct = async (id, {...data}) => {
        const products = this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if(index != -1){
            products[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(products))
            return products[index]
        }else{
            console.log('Producto no encontrado')
        }
    }

    deleteProduct = async (id) =>{
        const products = this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if(index != -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        }else{
            console.log("Producto no disponible")
        }
    }
}