const express = require("express");
const router = express.Router();
const programAndBatchController = require("../contorller/programAndBatchController");
const authController = require("../contorller/authContoller");

router
  .route("/program")
  .post(authController.protect, programAndBatchController.createProgram)
  .get(programAndBatchController.getPrograms);
router
  .route("/batch")
  .post(authController.protect, programAndBatchController.createBatch)
  .get(programAndBatchController.getBatchs);

router
  .route("/program/:id")
  .delete(authController.protect, programAndBatchController.deleteProgram);
router
  .route("/batch/:id")
  .delete(authController.protect, programAndBatchController.deleteBatch);

module.exports = router;
