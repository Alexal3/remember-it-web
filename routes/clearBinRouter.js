const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();

router.delete('/', redirectToIndexIfNotAuthenticated, async (req, res) => {
  try {
    await Note.destroy({
      where: {
        userId: req.user.id,
        deleted: true
      }
    });

    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;