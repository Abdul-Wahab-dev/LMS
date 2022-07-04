const Program = require("../model/Program");
const Batch = require("../model/Batch");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createProgram = catchAsync(async (req, res, next) => {
  const program = await Program.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      program,
    },
  });
});

exports.getPrograms = catchAsync(async (req, res, next) => {
  const programs = await Program.find({});
  res.status(200).json({
    status: "success",
    data: {
      programs,
    },
  });
});

exports.deleteProgram = catchAsync(async (req, res, next) => {
  const program = await Program.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      program,
    },
  });
});

exports.createBatch = catchAsync(async (req, res, next) => {
  const batch = await Batch.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      batch,
    },
  });
});

exports.getBatchs = catchAsync(async (req, res, next) => {
  const batchs = await Batch.find({});
  res.status(200).json({
    status: "success",
    data: {
      batchs,
    },
  });
});

exports.deleteBatch = catchAsync(async (req, res, next) => {
  const batch = await Batch.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      batch,
    },
  });
});
