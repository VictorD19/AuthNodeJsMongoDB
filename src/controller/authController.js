// instanciando rotas do usuario
const express = require('express')
const router = express.Router()

// recueprando model user
const User = require('../models/user')


router.post('/register', async(req, res) => {
    try {

        const { name, email, password } = req.body

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User realding exists' });


        const newUser = {};
        newUser.name = name
        newUser.email = email
        newUser.password = password

        const user = await User.create(newUser)
        user.password = undefined
        console.log(user);
        return res.send({ user })

    } catch (err) {
        return res.status(400).send({ error: 'Registration Failed' })
    }
})


module.exports = app => app.use('/auth', router)