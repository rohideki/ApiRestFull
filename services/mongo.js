const { MongoClient } = require('mongodb');

module.exports = {

  insertMany: async (data) => {
    const url = `${process.env.DB_MONGO}`;
    const client = new MongoClient(url);
    const dbName = `${process.env.DB_MONGO_NAME}`;
    const conn = await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(`${process.env.DB_MONGO_COLLECTION}`);
    const insertResult = await collection.insertMany([{ data }]);
    return insertResult;
  },


  insertErr: async (data) => {
    const url = `${process.env.DB_MONGO}`;
    const client = new MongoClient(url);
    const dbName = `${process.env.DB_MONGO_NAME}`;
    const conn = await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(`${process.env.DB_MONGO_COLLECTION_ERR}`);

    const insertResult = await collection.insertMany([{ data }]);
    return insertResult;
  },

  userDeleted: async (data) => {
    const url = `${process.env.DB_MONGO}`;
    const client = new MongoClient(url);
    const dbName = `${process.env.DB_MONGO_NAME}`;
    const conn = await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(`${process.env.DB_MONGO_COLLECTION_UDEL}`);

    const insertResult = await collection.insertMany([{ data }]);
    return insertResult;
  },


customerDeleted:async (data) => {
  const url = `${process.env.DB_MONGO}`;
  const client = new MongoClient(url);
  const dbName = `${process.env.DB_MONGO_NAME}`;
  const conn = await client.connect();
  const db = client.db(dbName);
  console.log(process.env)
  const collection = db.collection(`${process.env.DB_MONGO_COLLECTION_CDEL}`);

  const insertResult = await collection.insertMany([{ data }]);
  return insertResult;
},

buscaDeleted: async () => {
  const url = `${process.env.DB_MONGO}`;
  const client = new MongoClient(url);
  const dbName = `${process.env.DB_MONGO_NAME}`;
  const conn = await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(`${process.env.DB_MONGO_COLLECTION}`);

  const buscaResult = await collection.deleteMany({'data.created_at': {$gt: new Date('2021-08-02')}});
  console.log(buscaResult)
  return buscaResult;
},

};