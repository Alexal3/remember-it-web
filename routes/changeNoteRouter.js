const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.put('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    await Note.update({
      title: req.body.title,
      body: req.body.body
    }, {
      where: {
        id: req.body.id,
        userId: req.user.id
      }
    })

    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;