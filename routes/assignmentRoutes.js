const express = require("express");
const router = express.Router();
const assignmentController = require("../contorller/assignmentController");
const authController = require("../contorller/authContoller");
const fileController = require("../contorller/fileController");

router
  .route("/")
  .post(
    authController.protect,
    fileController.fileUpload,
    assignmentController.create
  )
  .get(authController.protect, assignmentController.getAssignment);
router
  .route("/:id")
  .delete(authController.protect, assignmentController.delete);
router.patch(
  "/addwork",
  authController.protect,
  fileController.fileUpload,
  assignmentController.addwork
);

router.patch(
  "/addremarks",
  authController.protect,
  assignmentController.addRemarks
);

module.exports = router;
