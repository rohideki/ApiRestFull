const bodyParser = require('body-parser');
const express = require('express');
const error = require('./middlewares/error');
const cors = require('cors')
const routes = require('./routes/index')
const app =  express();
const path = require('path')
require('dotenv').config()
global.ENVIRONMENT = {}

for (var prop in process.env) ENVIRONMENT[prop] = process.env[prop]
app
  .disable('x-powered-by')
  .disable('etag')
  .use(cors())
  .use(bodyParser.json({limit: '1mb'}))
  .use(bodyParser.urlencoded({limit: '1mb',extended: true}))
  .use(express.static(__dirname + '/files'))

  var router = require('express').Router()
app.use('/api', router)
require(__dirname + '/routes/index.js')(router, app)



app.listen(3030, ()=>{
    console.log('Server is running')
})