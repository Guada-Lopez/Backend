import { Router } from "express";
import ProductManager from "../productManager.js";

const productsRouter = Router ()


productsRouter.get('/', async (req, res)=>{
    try{
        const products = await ProductManager.getProducts()
        return res.json(products)
    }catch(error){
        res.send('No se pueden obtener los productos')
    }
})

productsRouter.get('/:pid', async (req, res)=>{
    const{pid} = req.params;

    try{
        const products = await ProductManager.getProductsbyId(pid)
        return res.json(products)
    }catch (error){
        res.send(`El producto con el id:${pid} no se puede obtener en este momento`)
    }
})

productsRouter.post('/', async(req,res)=>{
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        const response = await ProductManager.add({title, description, code, price, status, stock, category, thumbnails})
        res.json(response)
    }catch(error){
        res.send('No se puedo agregar el producto')
    }
})

productsRouter.put('/:pid', async(req, res)=>{
    const{pid} = req.params;

    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        const response = await ProductManager.updateProduct(title, description, code, price, status, stock, category, thumbnails)
        return res.json(response)
    }catch (error){
        res.send(`El producto con el id:${pid} no pudo ser actualizado`)
    }
})

productsRouter.delete('/', async(req, res)=>{
    const {pid} = req.params;

    try{
        await ProductManager.deleteProduct(pid)
        res.send('Producto eliminado')
    }catch(error){
        res.send(`El producto con el id:${pid} no pudo ser eliminado`)

    }
})

export {productsRouter};