const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.get('/', async (req, res) => {
  const notes = await Note.getAll();
  // res.sendFile(path.join(__dirname, '..', 'views', 'notes.html'));
  res.render('notes', {
    layout: 'notes',
    isNotes: true,
    notes: notes.filter((note) => {
      if (note.deleted === false && note.archived === false) {
        return true;
      }
    }).reverse()
  });
});

module.exports = router;