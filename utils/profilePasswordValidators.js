const bcrypt = require('bcryptjs');
const {body} = require('express-validator');
const User = require('../models/user');
let user;

exports.profilePasswordValidators = [
  body('userId')
    .custom(async (value, {req}) => {
      try {
        user = await User.findByPk(value);
        if (!user) {
          return Promise.reject('Пользователь с таким ID не найден');
        }
      } catch (err) {
        console.log(err);
      }
    }),
  body('oldPassword')
    .custom(async (value, {req}) => {
      try {
        let areSame;
        if (user) {
          areSame = await bcrypt.compare(value, user.password);
        }
        if (!areSame) {
          return Promise.reject('Неверный старый пароль');
        }
      } catch (err) {
        console.log(err);
      }
    }),
  body('newPassword')
    .isLength({ min: 8, max: 30 })
    .withMessage('Пароль слишком короткий или длинный. Используйте от 8 до 30 символов')
    .matches(/_/)
    .withMessage(`Пароль должен содержать буквы в верхнем и нижнем регистре, цифры и подчёркивание '_'`)
    .matches(/\p{Lu}/u)
    .withMessage(`Пароль должен содержать буквы в верхнем и нижнем регистре, цифры и подчёркивание '_'`)
    .matches(/\p{Ll}/u)
    .withMessage(`Пароль должен содержать буквы в верхнем и нижнем регистре, цифры и подчёркивание '_'`)
    .matches(/[0-9]/)
    .withMessage(`Пароль должен содержать буквы в верхнем и нижнем регистре, цифры и подчёркивание '_'`),
  body('confirmPassword')
    .custom((value, {req}) => {
      if (value !== req.body.newPassword) {
        throw new Error('Пароли не совпадают');
      }
      return true;
    })
];