const redis = require("redis");

module.exports.insertRedis = function(data){

    const client = redis.createClient(process.env.DB_REDIS);

    let prop = Object.keys(data);
    let value = Object.values(data);
  
    client.on("error", function(error) {
      console.error(error);
    });
    

    client.set(prop.toString(), value.toString())
    client.get(prop.toString(), redis.print);

    return redis;
} 
