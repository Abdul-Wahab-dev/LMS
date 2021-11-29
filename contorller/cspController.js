const CSP = require("../model/CSP");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const cspInputValidator = require("../validation/CSP");

// @route         CREATE /api/v1/csp
// @desc          create CSP
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // destructure
  const data = JSON.parse(req.body.csp);
  // input validation
  const { errors, isValid } = cspInputValidator(data);
  // Check Validation
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  // save fileName if file exists
  data.fileName = req.file ? req.file.key : "";

  const csp = await CSP.create(data);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      csp,
    },
  });
});

// @route         GET /api/v1/csp/:porgram/:batch/:enrollmentNo
// @desc          get CSP
// @access        Private
exports.getCSP = catchAsync(async (req, res, next) => {
  const csps = await CSP.find({
    $or: [
      {
        $or: [
          {
            $and: [
              // { "from.Id": req.user.enrollmentNo },
              { program: req.params.program },
              { batch: req.params.batch },
            ],
          },
          {
            $and: [
              // { "from.Id": req.user.enrollmentNo },
              { enrollmentNo: req.params.enrollmentNo },
            ],
          },
        ],
      },
      { enrollmentNo: req.user.enrollmentNo },
    ],
  });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      csps,
    },
  });
});

// @route         DELETE /api/v1/csp/:id
// @desc          delete CSP
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  const csp = await CSP.findOneAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      csp,
    },
  });
});

// @route         PATCH /api/v1/csp/addwork
// @desc          add CSP work
// @access        Private
exports.addwork = catchAsync(async (req, res, next) => {
  // destructure
  const data = JSON.parse(req.body.work);

  const csp = await CSP.findOneAndUpdate(
    { _id: data.id },
    { fileNameFromUser: req.file ? req.file.key : "" },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      csp,
    },
  });
});

// @route         PATCH /api/v1/csp/remarks
// @desc          add CSP work remarks
// @access        Private
exports.addRemarks = catchAsync(async (req, res, next) => {
  const csp = await CSP.findOneAndUpdate(
    { _id: req.body.id },
    { remarks: req.body.remarks },
    { new: true }
  );
  // send data to user
  res.status(200).json({
    status: "success",
    data: {
      csp,
    },
  });
});
// @route         GET /api/v1/csp/getCSPMembers
// @desc          get CSP Members
// @access        Private
exports.getCSPMember = catchAsync(async (req, res, next) => {
  const csps = await CSP.find().select(
    "-program -batch -name -deadLineDate -fileName -remarks -fileNameFromUser -createdAt"
  );
  // send data to user
  res.status(200).json({
    status: "success",
    data: {
      csps,
    },
  });
});
