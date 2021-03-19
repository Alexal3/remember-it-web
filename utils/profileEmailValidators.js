const bcrypt = require('bcryptjs');
const {body} = require('express-validator');
const User = require('../models/user');

exports.profileEmailValidators = [
  body('email')
    .custom(async (value, {req}) => {
      try {
        if (value === '') {
          return Promise.reject('Вы не ввели email');
        }
      } catch (err) {
        console.log(err);
      }
    })
    .isEmail()
    .withMessage('Некорректный email')
    .custom(async (value, {req}) => {
      try {
        const user = await User.findByPk(req.user.id);
        if (user.email === value) {
          return Promise.reject('Вы уже используете такой email');
        }
      } catch (err) {
        console.log(err);
      }
    })
    .custom(async (value, {req}) => {
      try {
        const user = await User.findOne({
          where: {
            email: value
          }
        });
        if (user) {
          return Promise.reject('Такой email уже занят');
        }
      } catch (err) {
        console.log(err);
      }
    })
];