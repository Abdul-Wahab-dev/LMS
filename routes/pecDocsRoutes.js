const express = require("express");
const router = express.Router();
// const passport = require("passport");
const pecController = require("../contorller/pecDocsController");
const authController = require("../contorller/authContoller");
const fileController = require("../contorller/fileController");

router
  .route("/")
  .post(
    authController.protect,
    fileController.fileUpload,
    pecController.create
  );

router.get(
  "/pecDocsMembers",
  authController.protect,
  pecController.getPECDocsFor
);
router
  .route("/doctype")
  .get(authController.protect, pecController.getType)
  .post(authController.protect, pecController.createType);

router.get("/:type", authController.protect, pecController.getDocs);
router
  .route("/doctype/:id")
  .delete(authController.protect, pecController.deleteType);

router.route("/:id").delete(authController.protect, pecController.delete);

router.patch(
  "/addwork",
  authController.protect,
  fileController.fileUpload,
  pecController.addWork
);
router.patch("/addremarks", authController.protect, pecController.addRemarks);
module.exports = router;
