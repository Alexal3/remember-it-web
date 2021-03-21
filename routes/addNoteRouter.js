const {Router} = require('express');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();
const jsonParser = require('express').json();

router.post('/', redirectToIndexIfNotAuthenticated, jsonParser, async (req, res) => {
  try {
    let note = await Note.create({
      title: req.body.title,
      body: req.body.body,
      archived: false,
      deleted: false,
      userId: req.user.id
    });
    
    res.json({
      status: 'success',
      content: note
    });
  } catch (err) {
    res.json({
      status: 'error',
      description: err.original.code,
    });
    console.log(err);
  }
});

module.exports = router;