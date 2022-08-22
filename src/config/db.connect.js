const mongoose = require('mongoose');
const { DB_NAME, DB_URL } = require('./config');

const connectDatabase = async () => {
  return await mongoose.connect(DB_URL, { dbName: DB_NAME, socketTimeoutMS: 60 * 1000 });
};

const closeDbConnection = () => {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
};

module.exports = { connectDatabase, closeDbConnection };
