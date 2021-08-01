const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/index');


//create a user

usersRouter.post('/users', async(req, res) => {
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
usersRouter.get('/users', async(req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users")

        res.json(users.rows);
    } catch (error) {
        console.error(error.message)
    }
})
//get a user
usersRouter.get('/users/:id', async(req, res) => {
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
usersRouter.put('/users/:id', async (req, res)=> {
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
usersRouter.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await pool.query('DELETE FROM users WHERE id = $1',
    [id])

    res.json('user deleted');
});
module.exports = usersRouter;