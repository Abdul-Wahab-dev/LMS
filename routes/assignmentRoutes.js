const express = require("express");
const router = express.Router();
const assignmentController = require("../contorller/assignmentController");
const authController = require("../contorller/authContoller");

router
  .route("/")
  .post(authController.protect, assignmentController.create)
  .get(authController.protect, assignmentController.getAssignment);
router
  .route("/:id")
  .delete(authController.protect, assignmentController.delete);
router.patch("/addwork", authController.protect, assignmentController.addwork);

router.patch(
  "/addremarks",
  authController.protect,
  assignmentController.addRemarks
);

module.exports = router;
