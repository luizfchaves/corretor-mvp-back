const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

/**
 * database in memory for tests
 */
class FakeDatabase {
  /**
   * Connects to database server
   */
  static async connect() {
    await mongod.start();
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15 * 1000,
      connectTimeoutMS: 15 * 1000,
      dbName: process.env.DB_NAME,
    });
  }

  /**
   * Disconnects from database server
   */
  static async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }

  /**
 * Delete db collections
 */
  static async clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      if (Object.prototype.hasOwnProperty.call(()=>{}, key)) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  }
}

module.exports = FakeDatabase;
