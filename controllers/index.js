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
        console.log(err)
        let insertMongo = await mongo.insertErr(err)
        return insertMongo
    }
}

module.exports.ControlPut = async (data) => {
  
    const saltRounds = 10;
    try {
        const { password, email,newPassword } = data
       
        const consulta = await mysql.selectCustomers(email);
  
        if(consulta == ''){
            return 'Email not found'
        }
        const newHash = bcrypt.hashSync(newPassword, saltRounds);
      
        
        const hash = bcrypt.compareSync(password, consulta[0].password);
      
        if(hash == true){
            const clientes = await mysql.updateCustomers(data,newHash)
            if(clientes != '') return 'Password updated'
    }
    return 'Invalid password!!'
}
    catch (err) {
        let insertMongo = await mongo.insertErr(err)
        return insertMongo
    }
}

module.exports.ControlDelete = async (data) => {
  
    const saltRounds = 10;
    try {
        const { password, email } = data
        
        const consulta = await mysql.selectCustomers(email);
  
        if(consulta == ''){
            return 'Email not found'
        }
                
        const hash = bcrypt.compareSync(password, consulta[0].password);
      
        if(hash == true){
            const clientes = await mysql.deleteCustomers(data)

            let insertMongo = await mongo.userDeleted(consulta)
       
            if(clientes != '') return 'User deleted!!'
    }
    return 'Invalid password!!'
}
    catch (err) {
        console.log(err)
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



