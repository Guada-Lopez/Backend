import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";

const app = express ();
const PORT = process.env.PORT || 8080;


app.listen (PORT, (req, res)=>{
    console.log(`Server is listening on port ${PORT}`)

})


app.use(express.json())
app.use(express.static('public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

export default app;