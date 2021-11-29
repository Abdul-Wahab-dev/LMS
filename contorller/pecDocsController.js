const PECDocs = require("../model/PECDocument");
const PECTYPE = require("../model/PECType");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const complainValidator = require("../validation/complain");

// @route         CREATE /api/v1/pec/doctype
// @desc          create pec document type
// @access        Private
exports.createType = catchAsync(async (req, res, next) => {
  const pecDocType = await PECTYPE.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      pecType: pecDocType,
    },
  });
});
// @route         GET /api/v1/pec/doctype
// @desc          get pec document type
// @access        Private
exports.getType = catchAsync(async (req, res, next) => {
  const pecDocType = await PECTYPE.find({}).select("-createdAt -__v");
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      pecType: pecDocType,
    },
  });
});
// @route         Delete /api/v1/pec/doctype/:id
// @desc          create pec document type
// @access        Private
exports.deleteType = catchAsync(async (req, res, next) => {
  const pecDocType = await PECTYPE.findByIdAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      pecType: pecDocType,
    },
  });
});

// @route         CREATE /api/v1/pec
// @desc          create pec document
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // convert data to object formate
  const data = JSON.parse(req.body.doc);
  // save fileName if exist
  data.fileName = req.file ? req.file.key : "";
  const pecDoc = await PECDocs.create(data);

  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      document: pecDoc,
    },
  });
});

// @route         GET /api/v1/pec
// @desc          get pec documents
// @access        Private
exports.getDocs = catchAsync(async (req, res, next) => {
  console.log(req.params.type);
  let forAllUser;
  if (req.user.role !== "student") {
    forAllUser = await PECDocs.find({ type: req.params.type });
  } else {
    forAllUser = await PECDocs.find({
      $or: [
        { "from.providerId": req.user.enrollmentNo },
        { "documentFor.enrollmentNo": req.user.enrollmentNo },

        { $and: [{ program: req.user.program }, { batch: req.user.batch }] },
      ],
    });
  }

  if (forAllUser && forAllUser.length > 0) {
    // send response to user
    return res.status(200).json({
      status: "success",
      data: {
        documents: forAllUser,
      },
    });
  }

  res.status(404).json({
    status: "success",
    errors: {
      message: "No Document Found",
    },
  });
});

// @route         GET /api/v1/pec/pecDocsMembers
// @desc          get pec members
// @access        Private
exports.getPECDocsFor = catchAsync(async (req, res, next) => {
  const documnets = await PECDocs.find({}).select(
    " -to -fileName -fileName -title -docSubmittedBy -createdAt -__v"
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      documnets,
    },
  });
});

// @route         DELETE /api/v1/pec/:id
// @desc          delete pec members
// @access        Private
exports.delete = catchAsync(async (req, res, next) => {
  const doc = await PECDocs.findOneAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      document: doc,
    },
  });
});

// @route         PATCH /api/v1/pec/addwork
// @desc          add pec documnet work
// @access        Private
exports.addWork = catchAsync(async (req, res, next) => {
  // convert data to object foramte
  const data = JSON.parse(req.body.doc);

  // save fileName if exist
  data.work.fileName = req.file ? req.file.key : "";
  const doc = await PECDocs.findOneAndUpdate(
    { _id: data.id },
    {
      $push: { docSubmittedBy: data.work },
    },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      document: doc,
    },
  });
});

// @route         PATCH /api/v1/pec/addremarks
// @desc          add pec documnet remarks
// @access        Private
exports.addRemarks = catchAsync(async (req, res, next) => {
  const document = await PECDocs.findOneAndUpdate(
    { "docSubmittedBy._id": req.body.id },
    {
      "docSubmittedBy.$.remarks": req.body.remarks,
    },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      document,
    },
  });
});
