const bcrypt = require('bcryptjs');
const {body} = require('express-validator');
const User = require('../models/user');
let user;

exports.loginValidators = [
  body('email')
    .custom(async (value, {req}) => {
      try {
        user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject('Пользователь с таким email не найден');
        }
      } catch (err) {
        console.log(err);
      }
    }),
  body('password')
    .custom(async (value, {req}) => {
      try {
        let areSame;
        if (user) {
          areSame = await bcrypt.compare(value, user.password);
        }
        if (!areSame) {
          return Promise.reject('Неверный пароль');
        }
      } catch (err) {
        console.log(err);
      }
    })
];