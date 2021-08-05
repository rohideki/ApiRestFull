const mysql = require('../services/mysql');
const mongo = require('../services/mongo')
const uuidv4 = require('uuid').v4

module.exports.ControlGet = async (data) => {
        

        const clientes = await mysql.selectCustomers(data.id);
        delete clientes[0].password

        let insertMongo = await mongo.insertMany(clientes[0])
        return clientes
    };

module.exports.ControlPost = async (data) => {
let id = await uuidv4()
        try {
            const clientes = await mysql.insertCustomers(data,id)
            return clientes
        }
        catch (err) {
            let insertMongo = await mongo.insertErr(err)
            return insertMongo
        }

    }





