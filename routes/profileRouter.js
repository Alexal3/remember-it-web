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
const gm = require('gm');
const {Op} = require("sequelize");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: 'damien.heller8@ethereal.email', 
    pass: 'wH19wvJNRmp7v2Ttzb'
  }
});

const setNewAvatar = async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user.avatarURL) {
    fs.unlink(user.avatarURL, async (err) => {
      if (err) {
        throw err;
      }

      User.update({ avatarURL: `avatars\\${req.file.filename}` }, {
        where: {
          id: req.user.id
        }
      });

      res.json({
        status: 'success',
        avatarURL: `avatars\\${req.file.filename}`
      });

      fs.unlink(`tmp\\${req.file.filename}`, async (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } else {
    User.update({ avatarURL: `avatars\\${req.file.filename}` }, {
      where: {
        id: req.user.id
      }
    });

    res.json({
      status: 'success',
      avatarURL: `avatars\\${req.file.filename}`
    });

    fs.unlink(`tmp\\${req.file.filename}`, async (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

router.post('/new-avatar', redirectToIndexIfNotAuthenticated, async (req, res) => {
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

      gm(req.file.path).size((err, value) => {
        if (err) {
          throw err;
        }

        let width = value.width;
        let height = value.height;

        if (width === height) {
          gm(req.file.path)
            .autoOrient()
            .resize(64, 64)
            .noProfile()
            .write(`avatars\\${req.file.filename}`, (err) => {
              if (err) {
                throw err;
              }
              setNewAvatar(req, res);
            });
        } else if (width > height) {
          const croppedSegmentOnSides = Math.round( (width - height) / 2 );

          gm(req.file.path)
            .crop(height, height, croppedSegmentOnSides, 0)
            .autoOrient()
            .resize(64, 64)
            .noProfile()
            .write(`avatars\\${req.file.filename}`, (err) => {
              if (err) {
                throw err;
              }
              setNewAvatar(req, res);
            });
        } else if (width < height) {
          const croppedSegmentAboveAndBelow = Math.round( (height - width) / 2 );

          gm(req.file.path)
            .crop(width, width, 0, croppedSegmentAboveAndBelow)
            .autoOrient()
            .resize(64, 64)
            .noProfile()
            .write(`avatars\\${req.file.filename}`, (err) => {
              if (err) {
                throw err;
              }
              setNewAvatar(req, res);
            });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete('/delete-avatar', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    fs.unlink(user.avatarURL, async (err) => {
      if (err) {
        throw err;
      }
      
      User.update({ avatarURL: null }, {
        where: {
          id: req.user.id
        }
      })

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
      const candidate = await User.findByPk(req.user.id);

      if (!candidate) {
        res.json({
          status: 'error',
          description: 'Пользователя с таким ID не найдено.'
        });
      }

      User.update({
        changeEmailToken: token,
        changeEmailTokenExp: Date.now() + 60 * 60 * 1000,
        newEmail: req.body.email
      }, {
        where: {
          id: req.user.id
        }
      })

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
  try {
    if (!req.params.token) {
      return res.redirect('/');
    }

    const user = await User.findOne({
      where: {
        changeEmailToken: req.params.token,
        changeEmailTokenExp: {
          [Op.gt]: Date.now()
        }
      }
    });

    if (!user) {
      return res.render('changeEmail', {
        error: 'Ссылка недействительная или некорректная'
      });
    }

    await User.update({ 
      email: user.newEmail,
      changeEmailToken: null,
      changeEmailTokenExp: null,
      newEmail: null,
     }, {
      where: {
        id: req.user.id
      }
    });

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

    const password = await bcrypt.hash(req.body.newPassword, 10);

    User.update({ password }, {
      where: {
        id: req.user.id
      }
    });

    res.json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;