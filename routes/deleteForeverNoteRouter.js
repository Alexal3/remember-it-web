const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();
const jsonParser = require('express').json();

router.delete('/', jsonParser, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.body.id);
  
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;