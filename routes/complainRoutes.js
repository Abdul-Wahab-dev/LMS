const express = require("express");
const router = express.Router();
const complainController = require("../contorller/complainController");
const authController = require("../contorller/authContoller");

router
  .route("/")
  .post(authController.protect, complainController.create)
  .get(authController.protect, complainController.getAllComplain)
  .patch(authController.protect, complainController.status);

router.get(
  "/getComplains",
  authController.protect,
  complainController.getAllComplainForAdmin
);
router
  .route("/:id")
  .patch(authController.protect, complainController.complainReply)
  .delete(authController.protect, complainController.delete);
module.exports = router;
