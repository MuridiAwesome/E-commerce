const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const usersRouter = require('./Routes/users');
const productsRouter = require('./Routes/products')

//middleware
app.use(express.json()); //req.body

//ROUTES//
app.use('/', usersRouter);
app.use('/', productsRouter)


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
