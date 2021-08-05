const express = require('express');
const controle = require('../controllers')
const router = express.Router()

module.exports.Get = router.get('/', async (request, response) => {
    let body = request.body
    let resposta = await controle.ControlGet(body)
   
    response.status(200).json({
        result: resposta
    })
})

module.exports.Post = router.post('/', async (request, response) => {
    let body = request.body
    
    let resposta = await controle.ControlPost(body)

    response.status(201).json({
        result: resposta
        
    })
})



