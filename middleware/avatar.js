const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'avatars');
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
    return cb(new Error('Изображение должно быть в формате PNG, JPG или JPEG.'), false);
  }
  
  cb(null, true);
}

const limits = {
  fileSize: 1024 * 1024 * 2
}

module.exports = multer({
  storage, fileFilter, limits
});