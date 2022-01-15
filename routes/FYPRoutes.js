const express = require("express");
const router = express.Router();
const passport = require("passport");
const fypController = require("../contorller/FYPController");
const authController = require("../contorller/authContoller");

router.get("/getnames", fypController.getProjectsName);
router.route("/").post(authController.protect, fypController.create);
router
  .route("/category")
  .post(authController.protect, fypController.createCategory)
  .get(authController.protect, fypController.getCategory);
router.delete(
  "/category/:id",
  authController.protect,
  fypController.deleteCategory
);

router.put("/assign-time", authController.protect, fypController.assignTime);
router.put(
  "/assign-teacher",
  authController.protect,
  fypController.assignTeacher
);
router
  .route("/:eventName?/:batch?")
  .get(authController.protect, fypController.getFYP);

router.route("/member").patch(authController.protect, fypController.addMember);
router
  .route("/:id/:fypId")
  .patch(authController.protect, fypController.addRemarks);
router.route("/:id").delete(authController.protect, fypController.deleteFYP);

router.patch("/ideadelete", authController.protect, fypController.deleteIdea);

router.patch(
  "/presentation-status",
  authController.protect,
  fypController.presentationStatus
);
module.exports = router;
