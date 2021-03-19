const {Router} = require('express');
const redirectToNotesIfAuthenticated = require('../middleware/redirectToNotesIfAuthenticated');
const router = Router();

router.get('/', redirectToNotesIfAuthenticated, (req, res) => {
  res.render('index');
});

module.exports = router;