 async function connect(){
   
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
    //console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}


module.exports ={
selectCustomers: async (data) =>{
  const conn = await connect();
  const [rows] = await conn.query(`SELECT * FROM users WHERE EMAIL = '${data}';`);
  return rows;
},

insertCustomers: async (data,id,hash)=>{  
  const conn = await connect();
  let [rows] = await conn.query(`SELECT * FROM users WHERE EMAIL='${data.email}'`);
  if(rows != ''){
return 'User is already!!'
  }
  [rows] = await conn.query(`INSERT INTO users (id,name,email,password) values('${id}','${data.name}','${data.email}', '${hash}')`);
  if(!rows) throw err
  return rows;
}
}

