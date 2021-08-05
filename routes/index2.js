const router = require('express').Router()
const routes = require('./index')
const error = require('../middlewares/error')

router.use('/', routes,error)



