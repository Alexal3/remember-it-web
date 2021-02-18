const {Router} = require('express');
const path = require('path');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const router = Router();

router.get('/', redirectToNotesIfAuthenticated, (req, res) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'index.hbs'));
  res.render('index');
});

module.exports = router;