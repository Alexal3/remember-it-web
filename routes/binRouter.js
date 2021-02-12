const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.get('/', async (req, res) => {
  const notes = await Note.getAll();

  res.render('bin', {
    layout: 'notes',
    isNotes: true,
    notes: notes.reverse()
  });
});

module.exports = router;