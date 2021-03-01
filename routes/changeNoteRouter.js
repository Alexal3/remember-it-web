const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.put('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    const {id} = req.body;
    delete req.body.id;
    const note = await Note.findById(id);
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.end();
    }
    Object.assign(note, req.body);
    await note.save();
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;