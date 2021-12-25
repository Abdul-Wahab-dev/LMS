const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Complain = require("../model/Complain");
const complainValidator = require("../validation/complain");

// @route         POST /api/v1/complains
// @desc          Create new complain
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // destructure data from validator Inputs
  const { errors, isValid } = complainValidator(req.body);

  // Check Validation if in-valid then throw error
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  // create assignment
  const complain = await Complain.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      complain,
    },
  });
});

// @route         Patch /api/v1/complains
// @desc          change the complain status
// @access        Private
exports.status = catchAsync(async (req, res, next) => {
  // find complain with ID and update
  const complain = await Complain.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });

  // check complain exist or not
  if (!complain) {
    return next(new AppError("complain not exist", 404));
  }

  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      complain,
    },
  });
});

// @route         GET /api/v1/complains
// @desc          get complains
// @access        Private
exports.getAllComplain = catchAsync(async (req, res, next) => {
  // find complain for complainer or complainee
  const complains = await Complain.find({
    $or: [
      { "from.complainerId": req.user.enrollmentNo },
      { "to.complaineeId": req.user.enrollmentNo },
    ],
  });

  // send response to user
  res.status(200).json({
    status: "succes",
    data: {
      complains,
    },
  });
});
// @route         GET /api/v1/complains/foradmin
// @desc          get complains
// @access        Private
exports.getAllComplainForAdmin = catchAsync(async (req, res, next) => {
  const complains = await Complain.find({});

  // send response to user
  res.status(200).json({
    status: "succes",
    data: {
      complains,
    },
  });
});

// @route         PATCH /api/v1/complains/:id
// @desc          reply to complain
// @access        Private
exports.complainReply = catchAsync(async (req, res, next) => {
  // find complain by ID
  const previousReply = await Complain.findById(req.params.id);

  // check if replies already exist then add new to it
  if (previousReply.reply.length > 0) {
    req.body.reply = [...req.body.reply, ...previousReply.reply];
  }

  // find complain and update with replies
  const complain = await Complain.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // send data to user
  res.status(201).json({
    status: "success",
    data: {
      complain,
    },
  });
});

// @route         DELETE /api/v1/complains/:id
// @desc          delete complain
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  // find complain by ID and delete it
  const complain = await Complain.findOneAndDelete({ _id: req.params.id });

  // check if complain exist or not
  if (!complain) {
    return res.status(404).json({
      status: "fail",
      errors: {
        message: "complain not found",
      },
    });
  }

  // send data to user
  res.status(200).json({
    status: "success",
    data: {
      complain,
    },
  });
});
