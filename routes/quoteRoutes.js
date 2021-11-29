const express = require("express");
const router = express.Router();
const authController = require("../contorller/authContoller");
const quoteController = require("../contorller/quoteController");

router
  .route("/")
  .post(authController.protect, quoteController.create)
  .get(quoteController.getQuotes);

router
  .route("/:id")
  .patch(authController.protect, quoteController.setDisplay)
  .delete(authController.protect, quoteController.delete);

module.exports = router;
