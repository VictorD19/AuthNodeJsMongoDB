const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const cosr = require('cors')
const port = 3000


app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))
app.use(cosr())

require('./src/controller/authController')(app);
require('./src/controller/sessionController')(app);


app.listen(port, () => {
    console.log('Servidor Iniciado....');
})