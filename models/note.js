const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const note = sequelize.define('note', {
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  body: {
    type: Sequelize.STRING,
    allowNull: true
  },
  archived: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = note;