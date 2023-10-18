const express = require("express");
const router = express.Router();
const sliderController = require("../contorller/sliderController");
const authContoller = require("../contorller/authContoller");

router
  .route("/")
  .post(authContoller.protect, sliderController.create)
  .get(sliderController.getSlides);
router
  .route("/:id")
  .delete(authContoller.protect, sliderController.deleteSlide);

module.exports = router;
