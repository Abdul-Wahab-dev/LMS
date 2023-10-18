const OfficalDocs = require("../model/OfficalDous");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const DocumnentValidator = require("../validation/officalDoc");

// @route         CREATE /api/v1/officalDocs
// @desc          create offical document
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // save fileName if exist
  const { errors, isValid } = DocumnentValidator(req.body);
  // Check Validation if in-valid then throw error
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }

  const OfficalDoc = await OfficalDocs.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      document: OfficalDoc,
    },
  });
});

// @route         GET /api/v1/officalDocs
// @desc          get offical documents
// @access        Private
exports.getDocs = catchAsync(async (req, res, next) => {
  // check user role === documnetFor and check providerId === req.user.enrollmentNo or to.id:""
  const forAllUser = await OfficalDocs.find({
    $or: [
      { "from.providerId": req.user.enrollmentNo },
      { $and: [{ "to.id": "" }, { documentFor: req.user.role }] },
      { $and: [{ "to.id": "" }, { documentFor: "all" }] },
      { "to.id": req.user.enrollmentNo },
    ],
  });

  if (forAllUser && forAllUser.length > 0) {
    return res.status(200).json({
      status: "success",
      data: {
        documents: forAllUser,
      },
    });
  }
  // send response to user
  res.status(404).json({
    status: "success",
    errors: {
      message: "No Document Found",
    },
  });
});

// @route         DELETE /api/v1/officalDocs
// @desc          delete offical document
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  const doc = await OfficalDocs.findOneAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      document: doc,
    },
  });
});
