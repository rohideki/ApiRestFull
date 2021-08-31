const express = require('express');
const controle = require('../controllers/clientControllers');
const router = express.Router();
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
        req.userId = decoded.id;
        next();
    });
};

module.exports.Get = router.get('/customers', async (request, response) => {
    if (request.query.cpf) {
        let query = request.query;
        let resposta = await controle.ControlGetByID(query);
        if (resposta == '') {
            response.status(404).json({
                result: 'Customer not found!!'
            });
        };
        response.status(200).json({
            result: resposta
        });
        return resposta;
    }
    resposta = await controle.ControlGetAll();
    response.status(200).json({
        result: resposta
    });
});

module.exports.Post = router.post('/customers', verifyJWT, async (request, response) => {

    let body = request.body;
    let resposta = await controle.ControlPost(body);
   
    if (resposta.affectedRows > 0) {
        response.status(201).json({
            result: "Customer created successfully!! "
        });
    }
    else {
        response.status(200).json({
            result: "Could not create user!!"
        });
  
    };
});

module.exports.Put = router.put('/customers', verifyJWT, async (request, response) => {
    let query = request.query;
    let body = request.body;
    let busca = await controle.ControlPut(query, body);
    if (busca != "") {
        response.status(200).json({
            result: busca
        });
    };
    response.status(404).json({
        result: "Client not found"
    });

});

module.exports.Delete = router.delete('/customers', verifyJWT, async (request, response) => {
    let query = request.query;
    let busca = await controle.ControlDelete(query);
    if (busca == 'Customer deleted!!') {
        response.status(204).json({
            results
        });
    };
    response.status(404).json({
        results: "Customer not found"
    });
});

module.exports.Err = router.get('/customerserr',  async (request, response) => {
    let busca = await controle.ControlErr();
    if (busca != '') {
        response.status(200).json({
            results: busca
        });
    }
    else{
        response.status(404).json({
            results: "Customer not found"
        });
    };   
});






