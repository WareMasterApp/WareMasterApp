const mongoose = require('mongoose');
const { DB_URL, DB_NAME } = require('../utils/const.env');

let database;

const initDB = async (callback) => {
  if (database) {
    console.log('DB is already initialized!');
    return callback(null, database);
  }
  try {
    const db = await mongoose.connect(DB_URL, { dbName: DB_NAME });
    database = db;
    console.log(
      `Connected to Mongo! Database name: "${db.connections[0].name}"`
    );
    callback(null, database);
  } catch (error) {
    console.error('DB connection error: ', error);
    callback(error);
  }
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDB,
  getDatabase,
};
