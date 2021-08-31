const mysql = require('../services/mysql');
const mongo = require('../services/mongo');
const redis = require('../services/redis')
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const sendMail = require('../helpers/enviarEmail')

module.exports.ControlGetAll = async (data) => {
    try{
        const clientes = await mysql.selectCustomers();
        
        if (clientes == '') {
            return 'Clients not found!!'
        };
        return clientes;
    }
    catch(err){
        let insertMongo = await mongo.insertErr(err);
        return err
    }        
};

module.exports.ControlGetByID = async (data) => {    
    try{
             const formatarCPF = require('../helpers/formatCPF')
        let cpf = await formatarCPF.formatarCPF(data)
    
        const clientes = await mysql.selectCustomers(cpf);
        if (clientes == '') {
            return 'Client not found!!'
        };
        return clientes;
    }
    catch(err){
        let insertMongo = await mongo.insertErr(err);
        return err
    }    
};

module.exports.ControlPost = async (data) => {   
     
    const formatarCPF = require('../helpers/formatCPF')
    const formatarFone = require('../helpers/formatFone')
    let cpf = await formatarCPF.formatarCPF(data) 
    let fone = await formatarFone.formatarFone(data)
    let id = await uuidv4();
    let enviaMail = await sendMail.sendMail(data)
    try{
        const clientes = await mysql.insertCustomer(id, cpf,fone,data);        
        return clientes;
    }
    catch (err) {    
        let insertMongo = await mongo.insertErr(err);
        return insertMongo;
    }
};

module.exports.ControlPut = async (query, body) => {
  
  
    try {
       let fone;
        const formatarCPF = require('../helpers/formatCPF')
        const formatarFone = require('../helpers/formatFone')
        let cpf = await formatarCPF.formatarCPF(query) 
       if(body.fone){
        fone = await formatarFone.formatarFone(body)
       }        
  
        const consulta = await mysql.selectCustomers(cpf);

        if(consulta == ''){
            return 'CPF not found';
        };
        
            const clientes = await mysql.updateCustomer(cpf, body, fone);
            if(clientes != '') return 'Customer updated';
    
    return 'Invalid customer!!';
}
    catch (err) {
        let insertMongo = await mongo.insertErr(err);
        return insertMongo;
    }
};

module.exports.ControlDelete = async (data) => {
    const formatarCPF = require('../helpers/formatCPF')
    let cpf = await formatarCPF.formatarCPF(data) 
    try {
        const consulta = await mysql.selectCustomers(cpf);  
        if(consulta == ''){
            return 'Customer not found';
        };        
        const customers = await mysql.deleteCustomer(cpf);                 
            if(customers != ''){
                let insertMongo = await mongo.customerDeleted(consulta);
                return 'Customer deleted!!';
            }            
    } 
    catch (err) {  
        let insertMongo = await mongo.insertErr(err);
        return insertMongo;
    }
};

module.exports.ControlErr = async () => {
    
    try {
        let consultaMongo = await mongo.buscaDeleted();
        return consultaMongo;
    } 
    catch (err) {  
        return err
    }
};



