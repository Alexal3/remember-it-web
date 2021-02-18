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
      res.json({
        status: 'error',
        description: 'Такой email уже занят'
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashPassword,
        notes: []
      });
      await user.save();

      req.session.user = user;
      req.session.isAuthenticated = true;

      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.json({
          status: 'success'
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;