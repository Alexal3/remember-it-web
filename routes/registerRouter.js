const {Router} = require('express');
const path = require('path');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const router = Router();

router.post('/', redirectToNotesIfAuthenticated, async (req, res) => {
  try {
    const {email, password, passwordConfirm} = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      ////////////
      res.redirect('/') // Here will be generating of error, because another user use provided email 
      ////////////
    } else {
      const user = new User({
        email,
        password,
        notes: []
      });
      await user.save();

      req.session.user = user;
      req.session.isAuthenticated = true;

      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect('/notes');
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;