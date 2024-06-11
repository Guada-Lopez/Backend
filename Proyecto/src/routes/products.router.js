import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router ()


productsRouter.get('/', async (req, res)=>{
    try{
        const products = productManager.getProducts()
        return res.json(products)
    }catch(error){
        res.send('No se pueden obtener los productos')
    }
})

productsRouter.get('/:pid', async (req, res)=>{
    const{pid} = req.params;

    try{
        const products =productManager.getProductsbyId(pid)
        return res.json(products)
    }catch (error){
        res.send(`El producto con el id:${pid} no se puede obtener en este momento`)
    }
})

productsRouter.post('/', async(req,res)=>{
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        const response = await productManager.add({title, description, code, price, status, stock, category, thumbnails})
        res.json(response)
    }catch(error){
        res.send('No se puedo agregar el producto')
    }
})

productsRouter.put('/:pid', async(req, res)=>{
    const{pid} = req.params;

    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        const response = await productManager.updateProduct(title, description, code, price, status, stock, category, thumbnails)
        return res.json(response)
    }catch (error){
        res.send(`El producto con el id:${pid} no pudo ser actualizado`)
    }
})

productsRouter.delete('/', async(req, res)=>{
    const {pid} = req.params;

    try{
        await productManager.deleteProduct(id)
        res.send('Producto eliminado')
    }catch(error){
        res.send(`El producto con el id:${pid} no pudo ser eliminado`)

    }
})

export {productsRouter};