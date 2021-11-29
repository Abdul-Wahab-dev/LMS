const express = require("express");
const router = express.Router();
const newsandupdatesController = require("../contorller/newsandupdatesController");
const authControlller = require("../contorller/authContoller");

router
  .route("/")
  .post(authControlller.protect, newsandupdatesController.create)
  .get(newsandupdatesController.getNews);

router
  .route("/:id")
  .delete(authControlller.protect, newsandupdatesController.delete);
module.exports = router;
