const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://skapesoves:nevsehocose@cluster0.waukqha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
