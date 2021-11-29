const OfficalDocs = require("../model/OfficalDous");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const complainValidator = require("../validation/complain");

// @route         CREATE /api/v1/officalDocs
// @desc          create offical document
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // convert data to object formate
  const data = JSON.parse(req.body.doc);
  // save fileName if exist
  data.fileName = req.file ? req.file.key : "";

  const OfficalDoc = await OfficalDocs.create(data);
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
