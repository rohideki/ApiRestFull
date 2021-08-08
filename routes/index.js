const router = require('express').Router()
const routes = require('./index2')
const error = require('../middlewares/error')

module.exports = function (router, app) {
    
    router.use('/', error,routes.Get)
    router.use('/', error,routes.Post)
    router.use('/', error,routes.Put)
    router.use('/', error,routes.Delete)
    router.use('/', error,routes.Login)


}

