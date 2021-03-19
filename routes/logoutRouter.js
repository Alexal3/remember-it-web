const {Router} = require('express');
const redirectToIndexIfNotAuthenticated = require('../middleware/redirectToIndexIfNotAuthenticated');
const router = Router();

router.get('/', redirectToIndexIfNotAuthenticated, async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/')
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;