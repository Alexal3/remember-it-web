const {Router} = require('express');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();

router.get('/', redirectToIndexIfNotAuthenticated, async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.user.id,
        deleted: true
      }
    })

    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
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

    res.render('bin', locals);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;