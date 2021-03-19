const Sequelize = require('sequelize');
const keys = require('../keys');

const sequelize = new Sequelize(keys.DB_NAME, keys.DB_USER_NAME, keys.DB_PASSWORD, {
  host: keys.DB_HOST,
  port: keys.DB_PORT,
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;