const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const note = require('./note');

const user = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  resetToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetTokenExp: {
    type: Sequelize.DATE,
    allowNull: true
  },
  changeEmailToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  changeEmailTokenExp: {
    type: Sequelize.DATE,
    allowNull: true
  },
  newEmail: {
    type: Sequelize.STRING,
    allowNull: true
  },
  avatarURL: {
    type: Sequelize.STRING,
    allowNull: true
  },
  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  emailConfirmationToken: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

user.hasMany(note, { onDelete: "cascade" });
module.exports = user;