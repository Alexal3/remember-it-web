const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();
const jsonParser = require('express').json();

router.delete('/', jsonParser, async (req, res) => {
  await Note.delete(req.body.id);

  res.end();
});

module.exports = router;