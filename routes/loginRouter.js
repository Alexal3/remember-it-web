const {Router} = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.post('/', redirectToNotesIfAuthenticated, jsonParser, async (req, res) => {
  try {
    const {email, password} = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.json({
            status: 'success'
          });
        })
      } else {
        res.json({
          status: 'error',
          description: 'Неверный пароль'
        });
      }
    } else {
      res.json({
        status: 'error',
        description: 'Пользователь с таким email не найден'
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;