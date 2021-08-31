const router = require('express').Router();
const users = require('./userRoutes');
const clients = require('./clientRoutes');
const error = require('../middlewares/error');

module.exports = function (router, app) {
    
    router.use('/', error,users.Get);
    router.use('/', error,users.Post);
    router.use('/', error,users.Put);
    router.use('/', error,users.Delete);
    router.use('/', error,users.Login);
    router.use('/', error,clients.Get);
    router.use('/', error,clients.Post);
    router.use('/', error,clients.Put);
    router.use('/', error,clients.Delete);
    router.use('/', error,clients.Err);


};

