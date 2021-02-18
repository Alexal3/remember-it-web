const {Router} = require('express');
const path = require('path');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const router = Router();

router.post('/', redirectToNotesIfAuthenticated, async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save();
    res.redirect('/notes');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;