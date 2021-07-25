const { query } = require('express');
const express = require('express');
const app = express();
const port = 5000;
const pool = require('./db/index');

//middleware
app.use(express.json()); //req.body

//ROUTES//

//create a user

 app.post('/users', async(req, res) => {
    try {
        const { id, first_name, last_name } = req.body;
        const newUser = await pool.query("INSERT INTO users (id, first_name, last_name) VALUES($1, $2, $3) RETURNING *",
        [id, first_name, last_name]
        )

        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message);
    }
}); 



//get all users
app.get('/users', async(req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users")

        res.json(users.rows);
    } catch (error) {
        console.error(error.message)
    }
})
//get a user
app.get('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM USERS WHERE id = $1', [id]
        );

        res.json(user.rows[0])
    } catch (error) {
        console.error(error)
    }
})
//update a user
app.put('/users/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const { first_name, last_name } = req.body;

        const user = await pool.query('UPDATE users SET first_name = $1, last_name = $2  WHERE id = $3',
            [ first_name, last_name, id ]
        )

        res.json('User has been updated')
    } catch (error) {
        console.error(error.message)
    }
})

//delete user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await pool.query('DELETE FROM users WHERE id = $1',
    [id])

    res.json('user deleted');
});


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
