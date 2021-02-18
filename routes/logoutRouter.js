const {Router} = require('express');
const path = require('path');
const User = require('../models/user');
const router = Router();

router.get('/', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/')
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;