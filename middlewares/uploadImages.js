const fs = require('fs').promises;
// eslint-disable-next-line import/no-unresolved
const multer = require('multer');
const { STATIC_FILES_DEST } = require('../app/config');

function configureMulter() {
  const storage = multer.diskStorage({
    destination: `${STATIC_FILES_DEST}/images`,
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

    if (allowedMimeTypes.includes(mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  return multer({ storage, fileFilter });
}

module.exports = configureMulter();
