const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();
const jsonParser = require('express').json();

router.put('/', jsonParser, async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.body.id, {
      deleted: true
    });
  
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;