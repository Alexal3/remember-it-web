const {Router} = require('express');
const router = Router();

router.use((req, res, next) => {
  if (req.session.isAuthenticated) {
    return res.redirect('/notes');
  }
  
  next();  
});

router.get('/', (req, res) => {
  res.render('faq', {
    title: 'Remember it! - заметки онлайн | FAQ'
  });
});

module.exports = router;