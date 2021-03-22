const {body} = require('express-validator');
const User = require('../models/user');

exports.resetValidators = [
  body('password')
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
  body('passwordConfirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Пароли не совпадают');
      }
      return true;
    })
];