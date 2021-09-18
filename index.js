const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))

require('./src/controller/authController')(app);


app.listen(port, () => {
    console.log('Servidor Iniciado....');
})