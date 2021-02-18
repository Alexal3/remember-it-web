const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.post('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  const note = new Note({
    title: req.body.title,
    body: req.body.body,
    archived: false,
    deleted: false,
    userId: req.user
  });

  try {
    await note.save();
    res.json(note);
  } catch (err) {
    console.log(err);
  }

  // const note = new Note(req.body.title, req.body.body);

  // await note.add();

  // res.json(note);
  // // res.send("success");
});

module.exports = router;