const {Router} = require('express');
const path = require('path');
const User = require('../models/user');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const router = Router();

router.post('/', redirectToNotesIfAuthenticated, async (req, res) => {
  try {
    const {email, password} = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = password === candidate.password;

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.redirect('/notes');
        })
      } else {
        ////////////
        res.redirect('/'); // Here will be generating of error, because password is incorrect 
        ////////////
      }
    } else {
      ////////////
      res.redirect('/'); // Here will be generating of error, because there are not ary users with provided email 
      ////////////
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;