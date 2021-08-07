const { MongoClient } = require('mongodb')

module.exports = {
  
  insertMany: async (data) => {  
    const url = `${process.env.DB_MONGO}`  
    const client = new MongoClient(url) 
    const dbName = `${process.env.DB_MONGO_NAME}`
    const conn = await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(`${process.env.DB_MONGO_COLLECTION}`)
    const insertResult = await collection.insertMany([{ data }])
    return insertResult
  },


  insertErr: async (data) => {
    const url = `${process.env.DB_MONGO}`  
    const client = new MongoClient(url) 
    const dbName = `${process.env.DB_MONGO_NAME}`
    const conn = await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(`${process.env.DB_MONGO_COLLECTION_ERR}`)
    console.log(data)
    const insertResult = await collection.insertMany([{ data }])
    return insertResult
  }
}