const express = require('express')
const { isValidObjectId } = require('mongoose')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const User = require('../models/user')




router.use(authMiddleware)

router.get('/', (req, res) => {
    const id = res.userId

    User.findById(`${id}`, (error, userData) => {
        if (error)
            return res.redirect('/auth/login')
        else
            return res.send(userData)
    })

})






module.exports = app => app.use('/dashboard', router)