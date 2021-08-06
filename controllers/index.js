const mysql = require('../services/mysql')
const mongo = require('../services/mongo')
const uuidv4 = require('uuid').v4
const bcrypt = require('bcrypt');

module.exports.ControlGet = async (data) => {
    const { name, password, email } = data
    
    const clientes = await mysql.selectCustomers(email);
    if (clientes == '') {
        return 'User invalid!!'
    }
    let compara = bcrypt.compareSync(password, clientes[0].password); // true
    delete clientes[0].password
    if (!compara) {
        return 'password invalid!!'
    }
    let insertMongo = await mongo.insertMany(clientes[0])
    return clientes
};

module.exports.ControlPost = async (data) => {
    let id = await uuidv4()
    const saltRounds = 10;
    try {
        const { password } = data
        const hash = bcrypt.hashSync(password, saltRounds);

        const clientes = await mysql.insertCustomers(data, id, hash)
        return clientes
    }
    catch (err) {
        let insertMongo = await mongo.insertErr(err)
        return insertMongo
    }
}

module.exports.ControlLogin = async (data) => {
    const { password, user } = data
    let email = user
    const clientes = await mysql.selectCustomers(email);
    if (clientes == '') {
        return 'User invalid!!'
    }
    let compara = bcrypt.compareSync(password, clientes[0].password); // true
    delete clientes[0].password
    if (!compara) {
        return 'password invalid!!'
    }
    let insertMongo = await mongo.insertMany(clientes[0])
    return clientes
};



