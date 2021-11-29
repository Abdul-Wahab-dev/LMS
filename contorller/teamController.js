const Team = require("../model/Team");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const teamValidator = require("../validation/team");
const memberValidator = require("../validation/member");
const teamAssignment = require("../validation/teamAssignment");

// @route         CREATE /api/v1/team
// @desc          create team
// @access        Private
exports.createTeam = catchAsync(async (req, res, next) => {
  const { errors, isValid } = teamValidator(req.body);

  // Check Validation
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  const team = await Team.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      team,
    },
  });
});

// @route         GET /api/v1/team
// @desc          get teams
// @access        Private
exports.getTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find({});
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      teams,
    },
  });
});

// @route         GET /api/v1/team//teamnames
// @desc          get teams names
// @access        Private
exports.getTeamName = catchAsync(async (req, res, next) => {
  const names = await Team.find({}).select(
    "-members -assignment -__v -createdBy -createdAt"
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      names,
    },
  });
});

// @route         DELETE /api/v1/team/:id
// @desc          delete team
// @access        Private
exports.deleteTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findOneAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      team,
    },
  });
});

// @route         CREATE /api/v1/team/member
// @desc          add member to existed team
// @access        Private
exports.addMember = catchAsync(async (req, res, next) => {
  // input validator
  const { errors, isValid } = memberValidator(req.body);
  // Check Validation
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  const member = await Team.findOneAndUpdate(
    req.body.id,
    { $push: { members: req.body.member } },
    {
      returnNewDocument: true,
    }
  );

  // send response to user
  res.status(201).json({
    status: "succes",
    data: {
      member,
    },
  });
});

// @route         GET /api/v1/team/members/:teamName/:batch
// @desc          get members
// @access        Private

exports.getMembers = catchAsync(async (req, res, next) => {
  const members = await Team.find({
    $and: [
      { _id: req.params.teamName },
      { members: { $elemMatch: { batch: req.params.batch } } },
    ],
  }).select("+teamName -semesterType -assignment -createdBy -createdAt");

  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      members: members,
    },
  });
});

// @route         CREATE /api/v1/team/assignment
// @desc          add assignment to existed team
// @access        Private
exports.addAssignment = catchAsync(async (req, res, next) => {
  // convert data to object formate
  const data = JSON.parse(req.body.assignment);
  // input validator
  const { errors, isValid } = teamAssignment(data);
  // Check Validation
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  // save filename if exist
  data.assignment.fileName = req.file ? req.file.key : "";

  const assignment = await Team.findOneAndUpdate(
    { _id: data.id },
    { $push: { assignment: data.assignment } },
    {
      returnNewDocument: true,
    }
  );

  // send data to user
  res.status(201).json({
    status: "succes",
    data: {
      assignment,
    },
  });
});

// @route         GET /api/v1/team/assignment
// @desc          get assignments
// @access        Private
exports.getAssignments = catchAsync(async (req, res, next) => {
  const assignments = await Team.find({
    $or: [
      {
        assignment: {
          $elemMatch: {
            $and: [
              { "assignmentCreatedBy.name": req.user.name },
              { "assignmentCreatedBy.enrollmentNo": req.user.enrollmentNo },
            ],
          },
        },
      },
      {
        assignment: {
          $elemMatch: {
            $and: [
              {
                $or: [{ program: req.user.program }, { batch: req.user.batch }],
              },
              { enrollmentNo: "" },
            ],
          },
        },
      },
      {
        assignment: {
          $elemMatch: {
            enrollmentNo: req.user.enrollmentNo,
          },
        },
      },
    ],
  }).select("-semesterType -members -createdBy -createdAt -__v");
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      assignments,
    },
  });
});

// @route         GET /api/v1/team/assignment/:teamID/:assignmentID
// @desc          delete assignments
// @access        Private
exports.deleteAssignment = catchAsync(async (req, res, next) => {
  const assignment = await Team.findOneAndUpdate(
    { _id: req.params.teamID },
    { $pull: { assignment: { _id: req.params.assignmentID } } },
    { safe: true, multi: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      assignment,
    },
  });
});

// @route         GET /api/v1/team/deletemember/:teamID/:memberID
// @desc          delete member
// @access        Private
exports.deleteMember = catchAsync(async (req, res, next) => {
  const member = await Team.findOneAndUpdate(
    { _id: req.params.teamID },
    { $pull: { members: { _id: req.params.memberID } } },
    { safe: true, multi: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      member,
    },
  });
});
