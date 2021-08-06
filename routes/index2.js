const express = require('express');
const controle = require('../controllers')
const router = express.Router()
const jwt = require('jsonwebtoken');

module.exports.Get = router.get('/', async (request, response,next) => {
    let body = request.body
    let resposta = await controle.ControlGet(body)   
    response.status(200).json({
        result: resposta
    })
})

module.exports.Post = router.post('/', async (request, response,next) => {
    let body = request.body    
    let resposta = await controle.ControlPost(body)
    response.status(201).json({
        result: resposta        
    })
})

 module.exports.Login = router.post('/login', async (request, response, next) => {
    let body = request.body
   let retorno = await controle.ControlLogin(body)    
    if(retorno != "User invalid!!" && retorno != "password invalid!!"){      
      const id = retorno.id; 
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });    
      return response.json({ auth: true, token: token });
    }    
    response.status(500).json({message: 'Login inválido!'});
})





