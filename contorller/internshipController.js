const Internship = require("../model/Internship");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const internshipInputValidator = require("../validation/internship");

// @route         POST /api/v1/internship
// @desc          create internship
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // input validator
  const { errors, isValid } = internshipInputValidator(req.body);

  // Check Validation
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  const internship = await Internship.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      internship,
    },
  });
});

// @route         GET /api/v1/internship/:program/:batch/:enrollmentNo
// @desc          get internships
// @access        Private
exports.getInternships = catchAsync(async (req, res, next) => {
  const internships = await Internship.find({
    $or: [
      { $and: [{ program: req.params.program }, { batch: req.params.batch }] },
      { enrollmentNo: req.params.enrollmentNo },
      // { "from.Id": req.user.enrollmentNo },
    ],
  });
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      internships,
    },
  });
});

// @route         DElETE /api/v1/internship/:id
// @desc          delete internship
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  const internship = await Internship.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      internship,
    },
  });
});

// @route         PATCH /api/v1/internship/:id
// @desc          update internship
// @access        Private
exports.update = catchAsync(async (req, res, next) => {
  const internship = await Internship.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      internship,
    },
  });
});
