const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const keys = require("../config/keys");
aws.config.update({
  secretAccessKey: keys.secretAccessKey,
  accessKeyId: keys.accessKeyId,
  region: keys.region,
});
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "files-uni",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "file" + "-" + Date.now() + path.extname(file.originalname));
    },
  }),
}).single("fileUpload");

exports.fileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        message: err.message,
        error: err,
      });
    } else {
      if (req.file == undefined) {
        next();
      } else {
        next();
      }
    }
  });
};
