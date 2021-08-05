const bodyParser = require('body-parser');
const express = require('express');
const error = require('./middlewares/error');

const routes = require('./routes/index')
const app =  express();

require('dotenv').config()

app.use(bodyParser.json({limit: '1mb'}))
app.use('/', routes.Get)


app.listen(3030, ()=>{
    console.log('Server is running')
})