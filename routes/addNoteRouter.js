const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();
const jsonParser = require('express').json();

router.post('/', jsonParser, async (req, res) => {
  const note = new Note(req.body.title, req.body.body);

  await note.add();

  res.json(note);
  // res.send("success");
});

module.exports = router;