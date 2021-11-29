const express = require("express");
const router = express.Router();
// const passport = require("passport");
const officalDocs = require("../contorller/officalDocsController");
const authController = require("../contorller/authContoller");
const fileController = require("../contorller/fileController");

router
  .route("/")
  .post(authController.protect, fileController.fileUpload, officalDocs.create)
  .get(authController.protect, officalDocs.getDocs);

router.route("/:id").delete(authController.protect, officalDocs.delete);
module.exports = router;
