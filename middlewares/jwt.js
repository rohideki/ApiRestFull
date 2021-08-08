3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
	
//index.js
const http = require('http'); 
const express = require('express'); 
const app = express(); 
 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
 
app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})
 
app.get('/clientes', (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
}) 
 
const server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")