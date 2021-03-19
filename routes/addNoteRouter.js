const {Router} = require('express');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.post('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      body: req.body.body,
      archived: false,
      deleted: false,
      userId: req.user.id
    });

    res.json(note);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;