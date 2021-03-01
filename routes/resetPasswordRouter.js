const {Router} = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const resetEmail = require('../emails/resetPassword');
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

router.put('/', jsonParser, (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        throw err;
      }

      const token = buffer.toString('hex');
      const candidate = await User.findOne({ email: req.body.email });

      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        await transporter.sendMail(resetEmail(candidate.email, token));
        res.json({
          status: 'success'
        });
      } else {
        res.json({
          status: 'error',
          description: 'Пользователя с таким email не найдено.'
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/');
  }

  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() }
    });

    if (!user) {
      return res.render('resetPassword', {
        error: 'Ссылка недействительная или некорректная'
      });
    } else {
      res.render('resetPassword', {
        userId: user._id.toString(),
        token: req.params.token
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put('/set-new-password', jsonParser, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() }
    });

    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.resetToken = undefined;
      user.resetTokenExp = undefined;
      await user.save();
      res.json({
        status: 'success'
      });
    } else {
      res.json({
        status: 'error',
        description: 'Ссылка недействительна либо пользователь не найден. Попробуйте выслать письмо сброса пароля ещё раз.'
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;