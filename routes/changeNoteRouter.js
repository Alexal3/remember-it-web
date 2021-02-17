const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();
const jsonParser = require('express').json();

router.put('/', jsonParser, async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      body: req.body.body
    });
  
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;