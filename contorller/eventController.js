const Events = require("../model/Event");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @route         POST /api/v1/event
// @desc          create event
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // convert data to Object form
  const data = JSON.parse(req.body.event);
  // save fileName if file exist
  data.fileName = req.file ? req.file.key : "";

  const eve = await Events.create(data);

  if (!eve) {
    return res.status(400).json({
      status: "fail",
      errors: {
        message: "Event not create",
      },
    });
  }

  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      event: eve,
    },
  });
});

// @route         GET /api/v1/event
// @desc          get Events
// @access        Public
exports.getEvent = catchAsync(async (req, res, next) => {
  const events = await Events.find({});
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      events,
    },
  });
});

// @route         get /api/v1/event/private
// @desc          get Events
// @access        Private
exports.getPrivateEvents = catchAsync(async (req, res, next) => {
  let events;
  // For coordinator
  if (req.user.role === "coordinator") {
    events = await Events.find({
      "eventProvider.providerId": req.user.enrollmentNo,
    });
  }
  // For Admin
  else {
    events = await Events.find({});
  }
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      events,
    },
  });
});

// @route         PATCH /api/v1/event/:id
// @desc          set to display event on Landing Page
// @access        Private
exports.setEventDisplay = catchAsync(async (req, res, next) => {
  const event = await Events.findOneAndUpdate(
    { _id: req.params.id },
    { display: req.body.display },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

// @route         DELETE /api/v1/event/:id
// @desc          delete Event
// @access        Private
exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findOneAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

// @route         get /api/v1/event/public
// @desc          get Events
// @access        Public

exports.getPublicEvents = catchAsync(async (req, res, next) => {
  const events = await Events.find({ display: true });

  res.status(200).json({
    status: "success",
    data: {
      events,
    },
  });
});
