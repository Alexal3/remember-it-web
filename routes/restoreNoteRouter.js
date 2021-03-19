const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.put('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    Note.update({ deleted: false }, {
      where: {
        id: req.body.id,
        userId: req.user.id
      }
    });

    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;