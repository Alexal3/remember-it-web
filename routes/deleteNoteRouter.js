const {Router} = require('express');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.put('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    await Note.update({
      deleted: true
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