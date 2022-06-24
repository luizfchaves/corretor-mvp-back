const {default: mongoose} = require('mongoose');

/**
 * Classe
 */
class DatabaseClient {
  /**
   * @typedef {import('mongoose').Model} MongooseModel
   */

  /**
   * @param {string} ModelName Nome da classe
   */
  constructor(ModelName) {
    this.Model = require(`./../../models/${ModelName}`);
  }

  /**
   * Get first item on database that matches with params
   * @param {*} params
   * @return {Promise<any>}
   */
  async first(params) {
    return this.Model.findOne(params);
  }

  /**
   * find items that matches with params
   * @param {*} params
   * @return {Promise<any>}
   */
  find(params) {
    return this.Model.find(params);
  }

  /**
   * create a item o database
   * @param {*} params
   * @return {Promise<any>}
   */
  create(params) {
    return this.Model.create(params);
  }

  static ValidationError = mongoose.Error.ValidationError;
}

module.exports = DatabaseClient;
