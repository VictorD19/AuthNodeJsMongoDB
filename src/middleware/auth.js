const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

// quando trabalhamos com tokes recebemos ele no formato bearer akjdkasjdsajdçlkasjdçlas(token)

module.exports = (req, res, next) => {


    // obtenendo o token
    const authHeader = req.headers.authorization

    // verificando se o token existe
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' })

    // caso exista sera dividido em 2 partes
    const parts = authHeader.split(' ')

    // comprovando que o token esteja valido
    if (!parts === 2)
        return res.status(401).send({ error: 'Token error' })

    // obtendo as propiedades do token dividido
    const [scheme, token] = parts

    // verificando que o inicio do token começe com bearer
    if (!/^Bearer$/i.test(scheme))
        return res.status(400).send({ error: 'Token malformatted' })


    // verificação da valides do toke, 1 parametro e o token ,2 String unica da app, 3 callback
    jwt.verify(token, authConfig.secret, (error, decode) => {
        if (error)
            return res.status(401).send({ error: 'Token Invalid' })


        // aqui se recebe o id que esta pasado la no generateToken do authController para assim poder ter acesso as informaçoes do usuario logado
        res.userId = decode.id
        return next();
    })
}