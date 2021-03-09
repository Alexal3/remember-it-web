const {body} = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Некорректный email')
    .custom(async (value, {req}) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject('Такой email уже занят');
        }
      } catch (err) {
        console.log(err);
      }
    }),
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