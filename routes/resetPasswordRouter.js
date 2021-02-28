const {Router} = require('express');
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

router.post('/', jsonParser, (req, res) => {
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

module.exports = router;