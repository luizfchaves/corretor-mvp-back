require('dotenv').config();
const app = require('./app');

const Logger = require('./src/plugins/logger');
global.Logger = Logger;
const Database = require('./src/plugins/database');


Database.connect();
app.use((req, res, next) => {
  Logger.info(`${req.method.toString().padEnd(7)} ${req.url}` );
  next();
});
app.listen(5000, () => {
  Logger.info('Server started on port 5002');
});
