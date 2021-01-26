const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('faq', {
    title: 'Remember it! - заметки онлайн | FAQ'
  })
})

module.exports = router;