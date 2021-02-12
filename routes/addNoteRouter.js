const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.post('/', async (req, res) => {
  const note = new Note(req.body.title, req.body.body);

  await note.add();

  res.redirect('/notes');
});

module.exports = router;