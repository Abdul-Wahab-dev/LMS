const express = require("express");
const passport = require("passport");
const router = express.Router();
const fileController = require("../contorller/fileController");
const authContorller = require("../contorller/authContoller");

router.patch(
  "/updatePassword",
  authContorller.protect,
  authContorller.updatePassword
);
router.post("/signup", fileController.fileUpload, authContorller.signup);
router.post("/login", authContorller.login);

router.post(
  "/create-multiple-users",
  authContorller.protect,
  authContorller.createMultipleUsers
);

router.get("/getprograms", authContorller.getProgramAndBatch);
router.get("/current", authContorller.protect, authContorller.currentUser);
router.post("/approve", authContorller.protect, authContorller.approveUser);

router.route("/").get(authContorller.getUsers);

router.route("/findUser").post(authContorller.protect, authContorller.getUser);
router.get("/designations", authContorller.designations);

router.patch(
  "/permission",
  authContorller.protect,
  authContorller.assignPermission
);
router.route("/:id").delete(authContorller.protect, authContorller.deleteUser);

router.get("/:role", authContorller.protect, authContorller.getAllUser);
router.patch(
  "/changeuserrole",
  authContorller.protect,
  authContorller.changeUserRole
);

module.exports = router;
