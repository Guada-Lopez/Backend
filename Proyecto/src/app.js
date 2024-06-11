import express from "express";
import { ProductManager } from "./productManager.js";
import { productsRouter } from "./routes/products.router.js";

const PORT = process.env.PORT || 8000;

app.listen (PORT, (req, res)=>{
    console.log(`Server is listening on port ${PORT}`)

})

const app = express ();

export const productManager = new productManager;

app.use('/api/products', productsRouter)
app.use(express.json())