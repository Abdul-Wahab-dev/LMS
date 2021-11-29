const express = require("express");
const router = express.Router();
const passport = require("passport");
const fypController = require("../contorller/FYPController");
const authController = require("../contorller/authContoller");

router.get("/getnames", fypController.getProjectsName);
router.route("/").post(authController.protect, fypController.create);

router
  .route("/:eventName?/:batch?")
  .get(authController.protect, fypController.getFYP);

router.route("/member").patch(authController.protect, fypController.addMember);
router
  .route("/:id/:fypId")
  .patch(authController.protect, fypController.addRemarks);
router.route("/:id").delete(authController.protect, fypController.deleteFYP);

router.patch("/ideadelete", authController.protect, fypController.deleteIdea);

module.exports = router;
