const {Router} = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const {loginValidators} = require('../utils/loginValidators');
const router = Router();
const jsonParser = require('express').json();

router.post('/', redirectToNotesIfAuthenticated, jsonParser, loginValidators, async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({
      where: {
        email
      }
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 'error',
        description: errors.array()[0].msg
      });
    }
    
    req.session.user = user;
    req.session.isAuthenticated = true;

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.json({
        status: 'success'
      });
    })
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;