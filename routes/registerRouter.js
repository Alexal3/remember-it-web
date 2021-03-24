const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const regEmail = require('../emails/registration');
const confirmEmail = require('../emails/confirm-email');
const {registerValidators} = require('../utils/registerValidators');
const router = Router();
const jsonParser = require('express').json();
const crypto = require('crypto');
const transporter = require('../utils/email');

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

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        throw err;
      }

      const token = buffer.toString('hex');
      
      await User.create({
        emailConfirmed: false,
        emailConfirmationToken: token,
        email,
        password: hashPassword,
      });
  
      res.json({
        status: 'success'
      });
      await transporter.sendMail(confirmEmail(email, token));
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/confirm-email/:token', redirectToNotesIfAuthenticated, jsonParser, async (req, res) => {
  try {
    let token = req.params.token;

    if (!token) {
      return res.redirect('/');
    }

    let candidate = await User.findOne({
      where: {
        emailConfirmationToken: token
      }
    });

    if (!candidate) {
      return res.render('email-confirmation', {
        error: 'Некорректная ссылка'
      });
    }

    if (candidate.emailConfirmed === true) {
      return res.render('email-confirmation', {
        success: 'Email уже подтвержден'
      });
    }

    candidate.update({
      emailConfirmed: true
    });
    res.render('email-confirmation', {
      success: 'Email успешно подтвержден'
    });
    await transporter.sendMail(regEmail(candidate.email));
  } catch (err) {
    console.log(err);
  }
});

router.post('/send-confirm-email', redirectToNotesIfAuthenticated, jsonParser, async (req, res) => {
  let user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  res.json({
    status: 'success'
  });
  await transporter.sendMail(confirmEmail(req.body.email, user.emailConfirmationToken));
});

module.exports = router;