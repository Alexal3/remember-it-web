const {Router} = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {validationResult} = require('express-validator');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const User = require('../models/user');
const {profileEmailValidators} = require('../utils/profileEmailValidators');
const {profilePasswordValidators} = require('../utils/profilePasswordValidators');
const changeEmail = require('../emails/changeEmail');
const router = Router();
const jsonParser = require('express').json();
const fs = require("fs");
// const fileMiddleware = require('../middleware/file');
// const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const avatar = require('../middleware/avatar');

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: 'damien.heller8@ethereal.email', 
    pass: 'wH19wvJNRmp7v2Ttzb'
  }
});

router.post('/new-avatar', redirectToIndexIfNotAuthenticated, /*jsonParser,*/ async (req, res) => {
  try {
    let upload = avatar.single('avatar');

    upload(req, res, async (err) => {
      if (err) {
        let description;

        switch (err.code) {
          case 'LIMIT_FILE_SIZE':
            description = 'Файл слишком большой.';
            break;
          default:
            description = err.message;
            break;
        }

        return res.json({
          status: 'error',
          description
        });
      }

      if (!req.file) {
        return res.json({
          status: 'error',
          description: 'Вы не выбрали аватар.'
        });
      }

      const user = await User.findById(req.user._id);

      if (user.avatarURL) {
        fs.unlink(user.avatarURL, async (err) => {
          if (err) {
            throw err;
          }
    
          user.avatarURL = req.file.path;
          await user.save();
    
          res.json({
            status: 'success',
            avatarURL: req.file.path
          });
        });
      } else {
        user.avatarURL = req.file.path;
        await user.save();
  
        res.json({
          status: 'success',
          avatarURL: req.file.path
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete('/delete-avatar', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    
    fs.unlink(user.avatarURL, async (err) => {
      if (err) {
        throw err;
      }
      
      user.avatarURL = undefined;
      await user.save();

      res.json({
        status: 'success'
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/new-email', redirectToIndexIfNotAuthenticated, jsonParser, profileEmailValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 'error',
        description: errors.array()[0].msg
      });
    }

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        throw err;
      }

      const token = buffer.toString('hex');
      const candidate = await User.findById(req.body.userId);

      if (!candidate) {
        res.json({
          status: 'error',
          description: 'Пользователя с таким ID не найдено.'
        });
      }

      candidate.changeEmailToken = token;
      candidate.changeEmailTokenExp = Date.now() + 60 * 60 * 1000;
      candidate.newEmail = req.body.email;
      await candidate.save();
      await transporter.sendMail(changeEmail(req.body.email, candidate.email, token));
      res.json({
        status: 'success'
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/new-email/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/');
  }

  try {
    const user = await User.findOne({
      changeEmailToken: req.params.token,
      changeEmailTokenExp: { $gt: Date.now() }
    });

    if (!user) {
      return res.render('changeEmail', {
        error: 'Ссылка недействительная или некорректная'
      });
    }

    user.email = user.newEmail;
    user.changeEmailToken = undefined;
    user.changeEmailTokenExp = undefined;
    user.newEmail = undefined;
    await user.save();

    res.render('changeEmail', {
      success: 'Имейл успешно изменен'
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/new-password', redirectToIndexIfNotAuthenticated, jsonParser, profilePasswordValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 'error',
        description: errors.array()[0].msg
      });
    }

    const user = await User.findById(req.body.userId);
    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();

    res.json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;