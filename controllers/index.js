const mysql = require('../services/mysql');
const mongo = require('../services/mongo')


module.exports.ControlGet = async (data) => {
        console.log(data)

        const clientes = await mysql.selectCustomers(data.id);

        let insertMongo = await mongo.insertMany(clientes[0])
        return insertMongo
    };

// module.exports.ControlPost = async (data) => {

//         try {
//             const clientes = await mysql.insertCustomers(data)
//             return clientes
//         }
//         catch (err) {
//             let insertMongo = await mongo.insertMany(err)
//             return insertMongo
//         }

//     }





