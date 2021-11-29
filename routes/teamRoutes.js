const express = require("express");
const router = express.Router();
const teamController = require("../contorller/teamController");
const authController = require("../contorller/authContoller");
const fileController = require("../contorller/fileController");

router.route("/").post(teamController.createTeam).get(teamController.getTeams);
router.route("/:id").delete(teamController.deleteTeam);
router.route("/member").post(teamController.addMember);
router.get("/members/:teamName/:batch", teamController.getMembers);
router
  .route("/assignment")
  .post(
    authController.protect,
    fileController.fileUpload,
    teamController.addAssignment
  )
  .get(authController.protect, teamController.getAssignments);
router
  .route("/assignment/:teamID/:assignmentID")
  .delete(teamController.deleteAssignment);
router.delete(
  "/deletemember/:teamID/:memberID",
  authController.protect,
  teamController.deleteMember
);

router.get("/teamnames", teamController.getTeamName);

module.exports = router;
