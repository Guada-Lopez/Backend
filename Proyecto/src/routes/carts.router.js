import { Router } from "express";
import CartManager from "../cartManager.js";

const cartsRouter = Router();

cartsRouter.post('/', async(req,res) =>{
    try{
        const response = await CartManager.newCart()
        res.json(response)
    }catch (error){
        res.send('No fue posible crear el carrito')
    }
})

cartsRouter.get('/', async(req,res) =>{
    const {cid} = req.params;
    try{
        const response = await CartManager.getCartProducts(cid)
        res.json(response)
    }catch(error){
        res.send('No se pudieron enviar los productos')
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params;
    try{
        await CartManager.addProductToCart(cid, pid)
        res.send('Producto agregado')
    }catch(error){
        res.send('No se pudo guardar el producto')
    }
})

export {cartsRouter};