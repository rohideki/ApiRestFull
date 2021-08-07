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
  let sql = `SELECT * FROM users WHERE EMAIL = '${data}';`
  const [rows] = await conn.query(sql);

  return rows;
},

insertCustomers: async (data,id,hash)=>{  

  const conn = await connect();
  let sql = `SELECT * FROM users WHERE EMAIL='${data.email}'`
  let sqlIns = `INSERT INTO users (id,name,email,password) values('${id}','${data.name}','${data.email}', '${hash}')`
  let [rows] = await conn.query(sql);

  if(rows != ''){
return 'User is already!!'
  }
  
  [rows] = await conn.query(sqlIns);

  if(!rows) throw err
  return rows;
},

updateCustomers: async (data,newHash)=>{  
  const conn = await connect();

    let sqlUp=`UPDATE users SET `
    if(data.name){
      let name = `name='${data.name}',`
    sqlUp += name
    }
    else{
    return "Name not found"
    }
    if(data.email){
        let email = `email='${data.email}',`
      sqlUp += email
    }
    else{
        return "Email not found"
    }
    if(newHash){
        let password = `password='${newHash}' `
     sqlUp += password
    }
    else{
        return "Password not found"
    }
    
    sqlUp += `WHERE email='${data.email}'`
  
    let [rows] = await conn.query(sqlUp);
    if(rows == ''){
      throw err
    }

    return rows
  
},

deleteCustomers: async (data)=>{  

  const conn = await connect();

  let sqlDel = `DELETE FROM users WHERE email = '${data.email}'`
  
  let [rows] = await conn.query(sqlDel);
  
    if(!rows) throw err
  return {results: 'User deleted' + rows};
},
}

