const express = require("express");
const router = express.Router();
const eventController = require("../contorller/eventController");
const authController = require("../contorller/authContoller");

router
  .route("/")
  .post(authController.protect, eventController.create)
  .get(eventController.getEvent);

router.get(
  "/private",
  authController.protect,
  eventController.getPrivateEvents
);
router.get("/public", eventController.getPublicEvents);
router
  .route("/:id")
  .patch(authController.protect, eventController.setEventDisplay)
  .delete(authController.protect, eventController.deleteEvent);
module.exports = router;
