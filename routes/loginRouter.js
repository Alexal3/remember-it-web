const {Router} = require('express');
const path = require('path');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const router = Router();

router.post('/', redirectToNotesIfAuthenticated, async (req, res) => {
  const user = await User.findById('602d213d4870cd3b1cd88f03');
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.redirect('/notes');
  });
});

module.exports = router;