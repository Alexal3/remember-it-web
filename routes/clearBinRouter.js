const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.delete('/', async (req, res) => {
  try {
    await Note.deleteMany({
      deleted: true
    });
    
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;