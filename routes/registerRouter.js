const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const regEmail = require('../emails/registration');
const {registerValidators} = require('../utils/registerValidators');
const router = Router();
const jsonParser = require('express').json();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: 'damien.heller8@ethereal.email', 
    pass: 'wH19wvJNRmp7v2Ttzb'
  }
});

router.post('/', redirectToNotesIfAuthenticated, jsonParser, registerValidators, async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 'error',
        description: errors.array()[0].msg
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashPassword,
    });

    req.session.user = user;
    req.session.isAuthenticated = true;

    req.session.save(async err => {
      if (err) {
        throw err;
      }
      res.json({
        status: 'success'
      });
      await transporter.sendMail(regEmail(email));
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;