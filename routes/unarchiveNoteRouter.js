const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();
const jsonParser = require('express').json();

router.put('/', jsonParser, async (req, res) => {
  await Note.update({
    id: req.body.id,
    title: req.body.title,
    body: req.body.body,
    archived: false,
    deleted: false
  });

  res.end();
});

module.exports = router;