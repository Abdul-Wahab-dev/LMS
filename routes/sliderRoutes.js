const express = require("express");
const router = express.Router();
const sliderController = require("../contorller/sliderController");
const fileController = require("../contorller/fileController");
const authContoller = require("../contorller/authContoller");

router
  .route("/")
  .post(
    authContoller.protect,
    fileController.fileUpload,
    sliderController.create
  )
  .get(sliderController.getSlides);
router
  .route("/:id")
  .delete(authContoller.protect, sliderController.deleteSlide);

module.exports = router;
