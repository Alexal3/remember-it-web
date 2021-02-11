const {Router} = require('express');
const path = require('path');
const User = require('../models/user');
const router = Router();

router.post('/', async (req, res) => {
  const user = new User(req.body.email, req.body.password);

  await user.register();

  res.redirect('/notes');
});

module.exports = router;