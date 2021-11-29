const express = require("express");
const router = express.Router();
const cspController = require("../contorller/cspController");
const authController = require("../contorller/authContoller");
const fileController = require("../contorller/fileController");

router.patch(
  "/addwork",
  authController.protect,
  fileController.fileUpload,
  cspController.addwork
);
router
  .route("/")
  .post(
    authController.protect,
    fileController.fileUpload,
    cspController.create
  );
router.get(
  "/:program/:batch/:enrollmentNo",
  authController.protect,
  cspController.getCSP
);
router.get(
  "/getCSPMembers",
  authController.protect,
  cspController.getCSPMember
);
router.patch("/remarks", authController.protect, cspController.addRemarks);
// .get(authController.protect, assignmentController.getAssignment);
// .get(authController.protect, complainController.getAllComplain)
// .patch(authController.protect, complainController.status);
router.route("/:id").delete(authController.protect, cspController.delete);
module.exports = router;
