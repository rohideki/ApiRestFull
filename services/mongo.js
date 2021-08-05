
    const { MongoClient } = require('mongodb')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
async function main(){
// Database Name
const dbName = 'admin'
await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('usuarios')

//console.log(data)
  // Use connect method to connect to the server
 
  //console.log('Connected successfully to server')
  
return 'done'

}
main()
.then(console.log)
.catch(console.error)
.finally(() => client.close())




module.exports = async function insertMany(data){
   
const conn = await main()
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'admin'
await client.connect()
    const db = client.db(dbName)
const collection = db.collection('usuarios')
    
  // the following code examples can be pasted here...
  const insertResult = await collection.insertMany( [{data}] )
  //console.log('Inserted documents =>', insertResult)
  return insertResult
}


// module.exports = async function insertErr(data){
   
// const conn = await main()
// const url = 'mongodb://localhost:27017'
// const client = new MongoClient(url)

// // Database Name
// const dbName = 'admin'
// await client.connect()
//     const db = client.db(dbName)
// const collection = db.collection('err')
    
//   // the following code examples can be pasted here...
//   const insertResult = await collection.insertMany( [{data}] )
//   //console.log('Inserted documents =>', insertResult)
//   return insertResult
// }
