 async function connect(){
   
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
    //console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
};

module.exports ={
selectUsers: async (data) =>{
  const conn = await connect();
  let sql = `SELECT * FROM users WHERE EMAIL = '${data}'`;
  const [rows] = await conn.query(sql);
  return rows;
},

insertUsers: async (data,id,hash)=>{  
  const conn = await connect();
  let sql = `SELECT * FROM users WHERE EMAIL='${data.email}'`;
  let sqlIns = `INSERT INTO users (id,name,email,password) values('${id}','${data.name}','${data.email}', '${hash}')`;
  let [rows] = await conn.query(sql);
  if(rows != ''){
return 'User is already!!';
  };  
  [rows] = await conn.query(sqlIns);
  if(!rows) throw err;
  return rows;
},

updateUsers: async (data,newHash)=>{  
  const conn = await connect();
    let sqlUp=`UPDATE users SET `;
    if(data.name){
      let name = `name='${data.name}',`;
    sqlUp += name;
    }
    
    if(data.email){
        let email = `email='${data.email}',`;
      sqlUp += email;
    }
    else{
        return "Email not found";
    };
    if(newHash){
        let password = `password='${newHash}' `;
     sqlUp += password;
    }
     
    if(data.token){
      let token = `token='${data.token}' `;
   sqlUp += token;
  }
  
    sqlUp += `WHERE email='${data.email}'`;

    let [rows] = await conn.query(sqlUp);
    if(rows == ''){
      throw err;
    };
    return rows;  
},

deleteUsers: async (data)=>{  
  const conn = await connect();
  let sqlDel = `DELETE FROM users WHERE email = '${data.email}'`;  
  let [rows] = await conn.query(sqlDel);  
    if(!rows) throw err;
  return {results: 'User deleted' + rows};
},

selectCustomers: async (cpf) =>{
      const conn = await connect();
  let sql = `SELECT * FROM customers `
    if(cpf != undefined) {       
    sql += `WHERE CPF = '${cpf}'`;
  }
  const [rows] = await conn.query(sql);
  return rows;
},

insertCustomer: async (id,cpf,fone,data)=>{  
  const conn = await connect();
  let sql = `SELECT * FROM customers WHERE CPF='${cpf}'`;
  let sqlIns = `INSERT INTO customers (customer_id,name,email,cpf,fone) values('${id}','${data.name}','${data.email}','${cpf}', '${fone}')`;
  let [rows] = await conn.query(sql);
  if(rows != ''){
return 'Customer already exists !!';
  };  
  [rows] = await conn.query(sqlIns);  
  if(!rows) throw err;
  return rows;
},

updateCustomer: async (cpf, body, fone)=>{  
  const conn = await connect();
  let foneForm;
  let email;
  let sqlUp;
    sqlUp =`UPDATE customers SET`;
      if(fone != undefined){
        foneForm = ` fone='${fone}',`;
        sqlUp += foneForm
      }
    if(body.email == undefined){
          let n = sqlUp.lastIndexOf(",");
        sqlUp = sqlUp.substring(0,n) 
        console.log(sqlUp)
      }
      else{
        email = ` email='${body.email}'`;
        sqlUp += email;
        }
  sqlUp += ` WHERE cpf='${cpf}'`;
    let [rows] = await conn.query(sqlUp);
    if(rows == ''){
      throw err;
    };
    return rows;
    },

deleteCustomer: async (data)=>{  
  const conn = await connect();
  let sqlDel = `DELETE FROM customers WHERE cpf = '${data}'`;  

  let [rows] = await conn.query(sqlDel);  
    if(!rows) throw err;
 
  return {results: 'Customer deleted' + rows};
},

}