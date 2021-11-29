const express = require("express");
const router = express.Router();
const internshipController = require("../contorller/internshipController");
const authController = require("../contorller/authContoller");

router.route("/").post(authController.protect, internshipController.create);

router.get(
  "/:program/:batch/:enrollmentNo",
  authController.protect,
  internshipController.getInternships
);
router
  .route("/:id")
  .delete(authController.protect, internshipController.delete)
  .patch(authController.protect, internshipController.update);

module.exports = router;
