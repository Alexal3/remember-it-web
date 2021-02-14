const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.post('/', async (req, res) => {
  await Note.deleteForeverDeletedNotes();
  
  res.redirect('/bin');
});

module.exports = router;