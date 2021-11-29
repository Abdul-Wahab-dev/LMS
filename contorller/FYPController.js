const FYP = require("../model/FYP");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fypValidator = require("../validation/fyp");

// @route         CREATE /api/v1/fyp
// @desc          create FYP
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // input validator
  const { errors, isValid } = fypValidator(req.body);

  // Check Validation
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  const project = await FYP.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      fyp: project,
    },
  });
});

// @route         GET /api/v1/fyp/:eventName?/:batch?
// @desc          get FYP
// @access        Private
exports.getFYP = catchAsync(async (req, res, next) => {
  const fyp = await FYP.find({
    $or: [
      {
        "projects.eventMembers": {
          $elemMatch: { enrollmentNo: req.user.enrollmentNo },
        },
      },
      {
        $and: [{ _id: req.params.eventName }, { batch: req.params.batch }],
      },
    ],
  });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      projects: fyp,
    },
  });
});

// @route         PATCH /api/v1/fyp/:id
// @desc          add FYP remarks
// @access        Private
exports.addRemarks = catchAsync(async (req, res, next) => {
  let project;
  project = await FYP.findOneAndUpdate(
    {
      $and: [
        { _id: req.params.id },
        { projects: { $elemMatch: { _id: req.params.fypId } } },
        // { "projects._id": req.params.fypId },
      ],
    },
    { $push: { "projects.$.remarks": req.body } },
    // req.body
    {
      new: true,
    }
  );

  // if not found then send error response to user
  if (!project) {
    return res.status(404).json({
      status: "success",
      errors: {
        message: "Project Not Found",
      },
    });
  }
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
// @route         Patch /api/v1/fyp/member
// @desc          Add Member
// @access        Private
exports.addMember = catchAsync(async (req, res, next) => {
  const project = await FYP.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { projects: req.body.project },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      project: project,
    },
  });
});

// @route         Patch /api/v1/fyp/memberdelete
// @desc          delete Project Idea
// @access        Private
exports.deleteIdea = catchAsync(async (req, res, next) => {
  const project = await FYP.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { projects: { _id: req.body.projectId } } },
    { safe: true, multi: true, new: true }
  );
  // send response to user
  console.log(project);
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
// @route         GET /api/v1/fyp/getnames
// @desc          get FYP names
// @access        Private

exports.getProjectsName = catchAsync(async (req, res, next) => {
  const names = await FYP.find({}).select(
    "-eventProvider -createdAt -__v -eventFor"
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      names,
    },
  });
});

// @route         DELETE /api/v1/fyp
// @desc          delete FYP
// @access        Private
exports.deleteFYP = catchAsync(async (req, res, next) => {
  const project = await FYP.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
