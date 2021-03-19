const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();

router.get('/', redirectToIndexIfNotAuthenticated, async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.user.id,
        archived: false,
        deleted: false
      }
    });

    notes.sort((a, b) => b - a);
  
    let locals = {
      layout: 'notes',
      isNotes: true,
      notes,
      email: req.user.email,
      userId: req.user.id
    };

    if (req.user.avatarURL) {
      locals.avatarURL = req.user.avatarURL;
    }

    res.render('notes', locals);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;