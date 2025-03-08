const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  mongodbUrl=process.env.MONGODB_URI;
  const client = await MongoClient.connect(
    MONGODB_URI
  );
  database = client.db();
}

function getDb() {
  if (!database) {
    throw new Error("Could not connect");
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
