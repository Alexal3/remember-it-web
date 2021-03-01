const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.put('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    const note = await Note.findById(req.body.id);
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.end();
    }
    note.deleted = false;
    await note.save();
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;