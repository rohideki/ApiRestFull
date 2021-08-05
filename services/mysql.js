
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
module.exports.selectCustomers =async (data) =>{
  
  const conn = await connect();
  const [rows] = await conn.query(`SELECT * FROM users WHERE EMAIL = '${data}';`);
 
  return rows;
}
module.exports.insertCustomers = async (data,id,hash)=>{
  
  const conn = await connect();
  let [rows] = await conn.query(`SELECT * FROM users WHERE EMAIL='${data.email}'`);

  if(rows != ''){
return 'User is already!!'
  }
  [rows] = await conn.query(`INSERT INTO users (id,name,email,password) values('${id}','${data.name}','${data.email}', '${hash}')`);
  
  if(!rows) throw err
 
  
  return rows;
}




