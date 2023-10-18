const Slider = require("../model/Slider");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @route         POST /api/v1/slider
// @desc          Create slide
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // Get Data

  const slide = await Slider.create(req.body);

  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      slide,
    },
  });
});

// @route         GET /api/v1/slider
// @desc          get Slides
// @access        Public
exports.getSlides = catchAsync(async (req, res, next) => {
  const slides = await Slider.find({});

  res.status(200).json({
    status: "success",
    data: {
      slides,
    },
  });
});
// @route         DELETE /api/v1/slider/:id
// @desc          delete Slide
// @access        Private

exports.deleteSlide = catchAsync(async (req, res, next) => {
  const slide = await Slider.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      slide,
    },
  });
});
