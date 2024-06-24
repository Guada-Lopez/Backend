import express from "express"
import {promises as fs} from 'fs';

export default class CartManager {

    constructor(){
        this.path = '/carts';
        this.carts =[];
    }

    getCarts = async () =>{
        const response = await fs.readfile(this.path, 'utf-8')
        const responseJSON = JSON.parse(response)

        return responseJSON
    }

    getCartProducts = async (id) =>{
        const carts = await this.getCarts()

        const cart = carts.find (cart => cart.id === id);

        if(cart){
            return cart.products
        }else{
            console.log('No se puedo obtener el carrito');
        }

    newCart = async ()=>{

        
        const newCart = {id, products: []}
        if (this.carts.length>0){
            newCart.id = this.carts[this.carts.length-1].id+1;
        }else{
            newCart.id = 1;
        }

        this.carts = await this.getCarts()
        this.carts.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(this.carts))

        return newCart;
    }

    addProductToCart = async (cartId, productId) =>{
        const carts = await this.getCarts()
        const index = carts.findIndex(cart => cart.id === cartId)

        if(index != -1){
            const cartPro = await this.getCartProducts(cartId)
            const indexPro = cartPro.findIndex(product => product.productId === productId)

            if(indexPro != -1){
                cartPro[indexPro].quantity = cartPro[indexPro].quantity + 1
            } else{
                cartPro.push({productId, quantity: 1})
            }
            
            carts[index].products = cartPro

            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log('El producto ya fue añadido al carrito')
        }else{
            console.log('No se pudo añadir el producto')
        }

    }

    }
}