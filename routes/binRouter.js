const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();

router.get('/', redirectToIndexIfNotAuthenticated, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user._id,
      deleted: true
    }).sort({ 
      $natural: -1 
    });
  
    let locals = {
      layout: 'notes',
      isNotes: true,
      notes: notes,
      email: req.user.email,
      userId: req.user._id
    };

    if (req.user.avatarURL) {
      locals.avatarURL = req.user.avatarURL;
    }

    res.render('bin', locals);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;