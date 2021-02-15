const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.get('/', async (req, res) => {
  const notes = await Note.getAll();

  res.render('archive', {
    layout: 'notes',
    isNotes: true,
    notes: notes.filter((note) => {
      if (note.deleted === false && note.archived === true) {
        return true;
      }
    }).reverse()
  });
});

module.exports = router;