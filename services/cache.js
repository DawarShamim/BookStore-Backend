const mongoose = require('mongoose');
const redis = require('redis');

const redisUrl = 'http://127.0.0.1:6379';
const client = redis.createClient(redisUrl);


(async () => {
  await client.connect();
})();
client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));
// client.hGet = util.promisify(client.hGet);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || 'default');
  return this;
};

// apply this on query for caching
// .cache({key:req.user.id});

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  try {
    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    }));


    // Check if the value exists in Redis
    const cacheValue = await client.hGet(this.hashKey, key);

    if (cacheValue) {
      // Parse the cached value
      const doc = JSON.parse(cacheValue);

      // Return the cached value
      return Array.isArray(doc)
        ? doc.map(d => new this.model(d))
        : new this.model(doc);
    }
    //Execute the query 
    const result = await exec.apply(this, arguments);

    // Setting the result in redis with expiration time of 600 seconds (10 minutes)
    client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 600);

    return result;
  } catch (err) {
    // Handle any errors that occur during execution or Redis operations
    console.error("Error:", err);
    throw err; // Rethrow the error to be handled higher up
  }
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey))

  }
};