const expressSession = require("express-session");

const mongoDbStore = require("connect-mongodb-session");
function createSessionStore() {
  const MongoDbStore = mongoDbStore(expressSession);
  const store = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "test",
    collection: "sessions",
  });
  return store;
}

function createSessionConfig() {
  return {
    secret: "bozo",
    resave: false,
    saveUnitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
