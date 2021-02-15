const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.delete('/', async (req, res) => {
  await Note.deleteForeverDeletedNotes();
  
  res.end();
});

module.exports = router;