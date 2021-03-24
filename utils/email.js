const nodemailer = require('nodemailer');
const keys = require('../keys');

module.exports = nodemailer.createTransport({
  host: keys.EMAIL_HOST,
  port: keys.EMAIL_PORT,
  auth: {
    user: keys.EMAIL_USER,
    pass: keys.EMAIL_PASSWORD
  }
});