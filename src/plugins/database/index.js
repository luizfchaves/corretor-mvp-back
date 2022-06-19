
const mongoose = require('mongoose');
const Logger = require('../logger');

/**
 * @class Database
 */
class Database {
  /**
   * Connects to database server
   */
  static connect() {
    if (process.env.NODE_ENV !== 'test') {
      mongoose.connect(process.env.DB_URI, {
        serverSelectionTimeoutMS: 15 * 1000,
        connectTimeoutMS: 15 * 1000,
        dbName: process.env.DB_NAME,
      });

      mongoose.connection.on('connected', () => {
        Logger.error(`NODE ENV: ${process.env.NODE_ENV}`);
        Logger.info(`Connected to database ${process.env.DB_URI}`);
      });

      mongoose.connection.on('error', (err) => {
        Logger.error(`NODE ENV: ${process.env.NODE_ENV}`);
        Logger.info(`Tried to connect  to database ${process.env.DB_URI}`);
        Logger.error('Database connection failed: '+err);
        setTimeout(Database.connect, 5000);
      });
    }
  }
}

module.exports = Database;
