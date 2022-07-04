const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const NewsAndUpdates = require("../model/NewsAndUpdates");
const newsValidate = require("../validation/news");

// @route         GET /api/v1/news
// @desc          get News
// @access        Private
exports.getNews = catchAsync(async (req, res, next) => {
  const newsandupdates = await NewsAndUpdates.find();
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      newsandupdates,
    },
  });
});

// @route         CREATE /api/v1/news
// @desc          create News
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  const { errors, isValid } = newsValidate(req.body);
  if (!isValid) {
    return next(new AppError(`Fields Required`, 400, errors));
  }
  const newsandupdates = await NewsAndUpdates.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      newsandupdates,
    },
  });
});

// @route         DELETE /api/v1/news/:id
// @desc          delete News
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  const news = await NewsAndUpdates.findOneAndDelete({ _id: req.params.id });

  if (!news) {
    return res.status(404).json({
      status: "fail",
      errors: {
        message: "no news and updates found",
      },
    });
  }
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      news: news,
    },
  });
});
