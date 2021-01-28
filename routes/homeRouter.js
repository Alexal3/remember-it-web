const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Remember it! - заметки онлайн'
  });
});

module.exports = router;