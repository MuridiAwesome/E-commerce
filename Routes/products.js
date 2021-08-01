    const express = require('express');
const productsRouter = express.Router();
const pool = require('../db/index.js');

productsRouter.post('/products', async( req, res) => {
    try {
        const { id, name, description, price } = req.body;

        const newProduct = await pool.query('INSERT INTO products VALUES($1, $2, $3, $4) RETURNING *',
        [id, name, description, price])
        res.json('Product has been added')
    } catch(err) {
        console.error(err)
    }
})

productsRouter.get('/products', async(req, res) => {
       try {
           const products = await  pool.query('SELECT * FROM products')

                res.json(products.rows) 
      } catch(err) {
          console.error(err)
     }
     
})

productsRouter.get('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id])

        res.json(product.rows);
    } catch (error) {
        console.error(error)
    }
})


productsRouter.put('/products/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const  price  = req.body.price;

        const newPrice = await pool.query(
            'UPDATE products SET price = $1 WHERE id = $2',
        [price, id]
        )

        res.json('product has been updated')
    } catch (error) {
        console.error(error)
    }
})

productsRouter.delete('/products/:id', async(req, res) => {
    const { id } = req.params;

    const removedProduct = await pool.query('DELETE from products WHERE id = $1', [id]);

    res.json('Product has been deleted')
})

module.exports = productsRouter;