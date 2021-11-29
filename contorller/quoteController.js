const Quote = require("../model/Quote");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @route         POST /api/v1/quote
// @desc          Create quote
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  const quote = await Quote.create(req.body);

  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      quote,
    },
  });
});
// @route         GET /api/v1/quote
// @desc          get quotes
// @access        Public
exports.getQuotes = catchAsync(async (req, res, next) => {
  const quotes = await Quote.find({});

  res.status(200).json({
    status: "success",
    data: {
      quotes,
    },
  });
});
// @route         DELETE /api/v1/quote/:id
// @desc          delete quote
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  const quote = await Quote.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      quote,
    },
  });
});

// @route         PATCH /api/v1/quote/:id
// @desc          set to display quote on Landing Page
// @access        Private
exports.setDisplay = catchAsync(async (req, res, next) => {
  const quote = await Quote.findOneAndUpdate(
    { _id: req.params.id },
    { display: req.body.display },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      quote,
    },
  });
});
