// eslint-disable-next-line import/no-unresolved
const multer = require('multer');
const { STATIC_FILES_DEST, STATIC_IMAGES_DIR } = require('../app/config');

function configureMulter() {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  const maxAllowedSize = 10485760;// 10mb

  const storage = multer.diskStorage({
    destination: `${STATIC_FILES_DEST}/${STATIC_IMAGES_DIR}`,
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    if (allowedMimeTypes.includes(mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  return multer({ storage, fileFilter, limits: { fileSize: maxAllowedSize } });
}

module.exports = {
  uploadSignleImage: configureMulter().single('image'),
  uploadCustom: configureMulter(),
};
