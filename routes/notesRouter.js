const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({
      archived: false,
      deleted: false
    }).sort({ 
      $natural: -1 
    });
  
    res.render('notes', {
      layout: 'notes',
      isNotes: true,
      notes: notes
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;