// recuperando banco de dados iniciado
const mongose = require('../database/database')

// libreria de incriptacion de senha
const bcryptjs = require('bcryptjs')

// criadnod modelo de usuarios
const UserShema = new mongose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    date: {
        type: String,
        default: new Date().toLocaleString()
    }
})

// sera executanda antes de guardar o usuario
UserShema.pre('save', async function(next) {

    // criação do hash + nro de veces que sera execuatado
    const hash = await bcryptjs.hash(this.password, 10)

    // atribuindo novo valor
    this.password = hash

    next();

})

// inserindo usuaria no banco de dados
const User = mongose.model('User', UserShema)

module.exports = User