const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__basedir}/static/images/profiles_imgs/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  limits:{ fileSize:1000000 },
});

module.exports = multer({ storage: diskStorage });
