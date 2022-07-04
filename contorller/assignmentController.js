const Assignment = require("../model/Assignment");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @route         POST /api/v1/assignment
// @desc          Create new assignment
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // create assignment
  const assignment = await Assignment.create(req.body);

  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      assignment,
    },
  });
});

// @route         GET /api/v1/assignment
// @desc          get assignments
// @access        Private
exports.getAssignment = catchAsync(async (req, res, next) => {
  // Destructure data from current User
  const { program, batch } = req.user;

  // find assignment if it's belong to specific batch or program of students or who's upload the assignment
  const assignments = await Assignment.find({
    $or: [
      { "from.providerId": req.user.enrollmentNo },
      {
        $and: [
          { assignmentFor: req.user.role },
          { program: req.user.program },
          { batch: req.user.batch },
        ],
      },
    ],
  });

  // check assignments exist or not
  if (assignments.length === 0) {
    return res.status(404).json({
      status: "fail",
      errors: {
        message: "Assingment not Found",
      },
    });
  }

  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      assignments,
    },
  });
});

// @route         DELETE /api/v1/assignment
// @desc          delete assignment
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  // delete assignment by it's ID
  const assignment = await Assignment.findOneAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      assignment,
    },
  });
});

// @route         PATCH /api/v1/assignment/addwork
// @desc          add work
// @access        Private
exports.addwork = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { assignmentSubmitBy: req.body.work },
    },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      assignment,
    },
  });
});

// @route         PATCH /api/v1/assignment/remarks
// @desc          add remarks
// @access        Private
exports.addRemarks = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findOneAndUpdate(
    { "assignmentSubmitBy._id": req.body.id },
    {
      "assignmentSubmitBy.$.remarks": req.body.remarks,
    },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      assignment,
    },
  });
});
