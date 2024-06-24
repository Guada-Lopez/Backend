import express from "express";
// import { ProductManager } from "./productManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
// import { CartManager } from "./cartManager.js";

const app = express ();
const PORT = process.env.PORT || 8080;


app.listen (PORT, (req, res)=>{
    console.log(`Server is listening on port ${PORT}`)

})

// export const productManager = new productManager;

app.use(express.json())
app.use(express.static('public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

export default app;