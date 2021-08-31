const express = require('express');
const controle = require('../controllers/userControllers');
const router = express.Router();

const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
};

module.exports.Get = router.get('/users', async (request, response) => {
    let body = request.body;

    if(!body.email){

        response.status(400).json({
        result: 'User not informed!!'
    });
    return
    }

    let resposta = await controle.ControlGet(body)   ;
    response.status(200).json({
        result: resposta
    });

});

module.exports.Post = router.post('/users',verifyJWT,async (request, response) => {
    let body = request.body;
    let resposta = await controle.ControlPost(body);

    response.status(201).json({
        result: resposta        
    });

});

module.exports.Put = router.put('/users', verifyJWT,async (request, response) => {
    let body = request.body;    
  
    let busca = await controle.ControlPut(body);  
    if(busca != ""){
        
        response.status(200).json({
            result: busca     
    }); 
    
       
    };
    return "User not found";
    
});

module.exports.Delete = router.delete('/users', verifyJWT,async (request, response) => {
    let body = request.body;    
  
    let busca = await controle.ControlDelete(body);  
    if(busca != ""){
        
        response.status(204).json({
            result: busca     
    }); 
    
       
    };
    return "User not found";
});

 module.exports.Login = router.post('/login', async (request, response) => {
    let body = request.body;

   let retorno = await controle.ControlLogin(body);    

    if(retorno != "User invalid!!" && retorno != "password invalid!!"){      
      const id = retorno.id; 
      const token = jwt.sign({ id }, process.env.SECRET, {
         expiresIn: 3000 // expires in 5min
      });

      body = {...body, token}
    
      let retornoToken = await controle.insertLogin(body); 
  
      return response.json({ auth: true, token: token });
    };    
    response.status(404).json({message: 'Login not found!'});
    
});





