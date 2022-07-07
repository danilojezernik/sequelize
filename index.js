const express = require('express')
const sequelize = require('./database')
const User = require('./User') //User MODEL

//sequelize.sync() ustvari podatkovno bazo
sequelize.sync({force: true}).then(() => console.log('db is ready'))
//{force: true} vsili ustvarjanje podatkovne baze brez createdAt in updatedAt

const app = express();

app.use(express.json())

/* app.post('/users', (req, res) => {
    //Tukaj bo user objekt - v req.body bomo prejemali te podatke (username,...)
    User.create(req.body).then(() => {
        //da bi express se zavedal req.body uporabimo midlleware: app.use(express.json())...
        res.send('user is inserted')
    })
})*/

//async varianta
app.post('/users', async (req, res) => {
    //Tukaj bo user objekt - v req.body bomo prejemali te podatke (username,...)
    await User.create(req.body)
    //da bi express se zavedal req.body uporabimo midlleware: app.use(express.json())...
    res.send('user is inserted');
})

//pridobitev vseh uporabnikov
app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.send(users)
})

//pridobitev uporabnika (id)
app.get('/users/:id', async (req, res) => {
    const requestedId = req.params.id;
    //const user -> uporabnik se pridobi iz podatkovne baze
    const user = await User.findOne({where: {id: requestedId}});
    res.send(user)
})

app.put('/users/:id', async (req, res) => {
    const requestedId = req.params.id;
    const user = await User.findOne({where: {id: requestedId}});
    user.username = req.body.username;
    await user.save();
    res.send('updated successfully!')
})

app.delete('/users/:id', async (req, res) => {
    const requestedId = req.params.id;
    await User.destroy({where: {id: requestedId}});
    res.send('removed successfully!')
})

app.listen(3000, () => {
    console.log("server listening")
})
