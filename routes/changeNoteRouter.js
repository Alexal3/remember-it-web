const {Router} = require('express');
const path = require('path');
const Note = require('../models/note');
const router = Router();

// console.log(1223);

router.post('/', async (req, res) => {

  // if (req.body.toDeleteForever) {
  //   await Note.delete(req.body.id);

  //   return res.redirect('/bin');
  // }

  // // if (req.body.toRestore) {
  // //   await Note.delete(req.body.id);

  // //   return res.redirect('/bin');
  // // }

  // await Note.update({
  //   id: req.body.id,
  //   title: req.body.title,
  //   body: req.body.body,
  //   archived: req.body.toArchive || false,
  //   deleted: req.body.toDelete || false
  // });

  // res.redirect(`/${req.body.page}`);

  switch (req.body.page) {
    case 'notes':
      await Note.update({
        id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        archived: Boolean(req.body.toArchive) || false,
        deleted: Boolean(req.body.toDelete) || false
      });
      
      res.redirect(`/${req.body.page}`);
      break;

    case 'archive':
      await Note.update({
        id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        archived: req.body.toUnarchive === 'true' ? false : true,
        deleted: Boolean(req.body.toDelete) || false
      });
      
      res.redirect(`/${req.body.page}`);
      break;

    case 'bin':
      if (req.body.toRestore) {
        await Note.update({
          id: req.body.id,
          title: req.body.title,
          body: req.body.body,
          archived: req.body.archived === 'false' ? false : true,
          deleted: false
        });
      }  

      if (req.body.toDeleteForever) {
        await Note.delete(req.body.id);
      }  

      res.redirect(`/${req.body.page}`);
      break;
  }
});

module.exports = router;