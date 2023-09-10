const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hGet = util.promisify(client.hGet);

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
    };

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));
    // see if any value exist in redis for key
    const cacheValue = await client.hGet(this.hashKey, key)

    // if true ,return that
    if (cacheValue) {
        // const doc = new this.model(Json.parse(cach eValue));
        const doc = JSON.parse(cacheValue);
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }
    // else issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 1000);
    return result;
};

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))

    }
};