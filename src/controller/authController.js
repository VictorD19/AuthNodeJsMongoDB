const express = require('express')

// Chamada do encriptador
const bcrypt = require("bcryptjs")

// libreria de gestion d token
const jwt = require('jsonwebtoken')

// Para criação de rotas 
const router = express.Router()

// Modelo de String do app unica (MD5)
const auhtScret = require('../config/auth.json')

// recueprando model user
const User = require('../models/user')


//  gererando token para usuario
function generateToken(params = {}) {

    // isto recebe os parmetro {json} , um hash (CodigoUdico Da aplicação) , e tempo de expiração
    return jwt.sign(params, auhtScret.secret, {
        expiresIn: 86400
    })

}

// Registro de usuario
router.post('/register', async(req, res) => {
    try {

        // recebendo os dados do usuario
        const { name, email, password } = req.body
            // verificando se o usuario existe
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });

        // criando un novo usuario com os dados
        const newUser = {};
        newUser.name = name
        newUser.email = email
        newUser.password = password

        // Criando usuario no banco de dados
        const user = await User.create(newUser)

        // Resetando a senha para nao aparecer
        user.password = undefined

        // enviando informaçoes do usurario
        return res.send({ user, token: generateToken({ id: user.id }) })

    } catch (err) {
        // Verificação de registro
        return res.status(400).send({ error: 'Registration Failed' })
    }
})


// autenticação de um usuario
router.post('/login', async(req, res) => {

    // recebendo os dados do usuario desde o html
    const { email, password } = req.body


    // istanciando um usuariro pelo email
    const user = await User.findOne({ email }).select('+password')

    // verificando se o usuario exise
    if (!user)
        return res.status(400).send({ error: 'User not found' });

    // verificando se a senha es correcta 
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Passaword incorrect' })

    // resetando a senha
    user.password = undefined

    // enviando iunformaçoes do usuario e token 
    res.send({ user, token: generateToken({ id: user.id }) })



})

module.exports = app => app.use('/auth', router)