const { MongoClient } = require('mongodb')
async function main() {
   const url = `${process.env.DB_MONGO}`  
  const client = new MongoClient(url) 
  const dbName = `${process.env.DB_MONGO_NAME}`
  await client.connect()
  return client
}


module.exports = {
  insertMany: async (data) => {  
    const url = `${process.env.DB_MONGO}`
    const conn = await main()
    const client = new MongoClient(url)
    const dbName = 'admin'
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(`${process.env.DB_MONGO_COLLECTION}`)
    const insertResult = await collection.insertMany([{ data }])
    return insertResult
  },


  insertErr: async (data) => {
    const url = `${process.env.DB_MONGO}`
    const conn = await main()
    const client = new MongoClient(url)
    const dbName = 'admin'
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(`${process.env.DB_MONGO_COLLECTION_ERR}`)
    const insertResult = await collection.insertMany([{ data }])
    return insertResult
  }
}