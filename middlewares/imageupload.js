const multer = require("multer");

const configMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname.replace(" ", "_") );
  }
})

var upload = multer({ storage: configMulter });

module.exports = upload;
