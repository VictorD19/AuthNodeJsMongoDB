// Instanciando Mongoose
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

// conectando ao banco de dados
mongoose.connect('mongodb://localhost/auth')
    .then(() => { console.log('MongoDB Conectado...') })
    .catch((error) => { console.log(`Conecion Faild ${error}`) })


// obs: Iniciar o banco de dados antes mongod e mongo

module.exports = mongoose