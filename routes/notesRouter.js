const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  console.log(123);
  res.render('notes', {
    title: 'Remember it! - Ваши заметки'
  });
});

module.exports = router;