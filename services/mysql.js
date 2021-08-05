async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:rasunda10568@localhost:3306/jogadores");
    //console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

connect()
async function selectCustomers(data){
  
  const conn = await connect();
  const [rows] = await conn.query(`SELECT * FROM users WHERE ID = ${data};`);
  
  return rows;
}

module.exports = {selectCustomers}
// module.exports = async function insertCustomers(data){
  
//   const conn = await connect();
//   const [rows] = await conn.query(`INSERT INTO users ('name','email','password') values(${data.name},${data.email}, ${data.password})`);
  
//   return rows;
// }

