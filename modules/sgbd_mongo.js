const MongoClient = require('mongodb').MongoClient
let url;
let mongoURL;

module.exports = function(type, host, port, dev) {
    url = type+"://"+host+":"+port+"/"+dev;
    mongoURL = process.env.MONGO_URL || url
}

async function initMongo() {
    console.log('Initialising MongoDB...')
    let success = false
    while (!success) {
      try {
        client = await MongoClient.connect(mongoURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        success = true
      } catch {
        console.log('Error connecting to MongoDB, retrying in 1 second')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    console.log('MongoDB initialised')
    return await client.db(client.s.options.dbName)
}

async function find(table) {
    const db = await initMongo()
    const notes = (await db.collection(table).find().toArray()).reverse()
    return notes
}

async function insertOne(table, note) {
    const db = await initMongo()
    await db.collection(table).insertOne(note)
}

module.exports.find = find;
module.exports.insertOne = insertOne;