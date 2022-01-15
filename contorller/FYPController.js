const FYP = require("../model/FYP");
const FYPCategory = require("../model/FYPCategory");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fypValidator = require("../validation/fyp");

// @route         CREATE /api/v1/fyp/category
// @desc          create FYP Category
// @access        Private
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await FYPCategory.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      category: category,
    },
  });
});
// @route         GET /api/v1/fyp/category
// @desc          get FYP Category
// @access        Private
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await FYPCategory.find({}).select("-createdAt -__v");
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      category: category,
    },
  });
});
// @route         Delete /api/v1/fyp/category/:id
// @desc          delete FYP Category
// @access        Private
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await FYPCategory.findByIdAndDelete({ _id: req.params.id });
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      category: category,
    },
  });
});

// @route         CREATE /api/v1/fyp
// @desc          create FYP
// @access        Private
exports.create = catchAsync(async (req, res, next) => {
  // input validator
  const { errors, isValid } = fypValidator(req.body);

  // Check Validation
  if (!isValid) {
    return next(new AppError("fields required", 400, errors));
  }
  const project = await FYP.create(req.body);
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      fyp: project,
    },
  });
});

// @route         GET /api/v1/fyp/:eventName?/:batch?
// @desc          get FYP
// @access        Private
exports.getFYP = catchAsync(async (req, res, next) => {
  let fyp;
  if (req.user.role === "student") {
    fyp = await FYP.aggregate([
      {
        $unwind: "$projects",
      },
      {
        $match: {
          "projects.eventMembers.enrollmentNo": req.user.enrollmentNo,
        },
      },
      {
        $group: {
          _id: "$_id",
          eventFor: {
            $first: "$eventFor",
          },
          eventName: {
            $first: "$eventName",
          },
          batch: {
            $first: "$batch",
          },
          projects: {
            $addToSet: "$projects",
          },
          eventProvider: {
            $first: "$eventProvider",
          },
          timeAssign: {
            $first: "$timeAssign",
          },
        },
      },
    ]);
  } else {
    fyp = await FYP.find({
      $and: [{ _id: req.params.eventName }, { batch: req.params.batch }],
    });
  }
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      projects: fyp,
      memberExist: fyp.length > 0 ? true : false,
    },
  });
});
// @route         PATCH /api/v1/fyp/presentation-status
// @desc          set presentation to active
// @access        Private
exports.presentationStatus = catchAsync(async (req, res, next) => {
  const fyp = await FYP.findOneAndUpdate(
    {
      _id: req.body.id,
      projects: {
        $elemMatch: {
          _id: req.body.projectId,
        },
      },
    },
    { $set: { "projects.$.status": req.body.status } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      fyp,
    },
  });
});
// @route         PATCH /api/v1/fyp/:id
// @desc          add FYP remarks
// @access        Private
exports.addRemarks = catchAsync(async (req, res, next) => {
  let project;
  project = await FYP.findOneAndUpdate(
    {
      $and: [
        { _id: req.params.id },
        { projects: { $elemMatch: { _id: req.params.fypId } } },
        // { "projects._id": req.params.fypId },
      ],
    },
    { $push: { "projects.$.remarks": req.body } },
    {
      new: true,
    }
  );

  // if not found then send error response to user
  if (!project) {
    return res.status(404).json({
      status: "success",
      errors: {
        message: "Project Not Found",
      },
    });
  }
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
// @route         Patch /api/v1/fyp/member
// @desc          Add Member
// @access        Private
exports.addMember = catchAsync(async (req, res, next) => {
  for (let i = 0; i < req.body.project.eventMembers.length; i++) {
    const existingProject = await FYP.findOne({
      $and: [
        { _id: req.body.id },
        {
          "projects.eventMembers": {
            $elemMatch: {
              enrollmentNo: req.body.project.eventMembers[i].enrollmentNo,
            },
          },
        },
      ],
    });
    if (existingProject) {
      return next(
        new AppError(
          `${req.body.project.eventMembers[i].enrollmentNo} already exist in a project`
        ),
        403,
        null
      );
    }
  }
  const project = await FYP.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { projects: req.body.project },
    },
    { new: true }
  );
  // res.end();
  res.status(200).json({
    status: "success",
    data: {
      project: project,
    },
  });
});

// @route         Patch /api/v1/fyp/memberdelete
// @desc          delete Project Idea
// @access        Private
exports.deleteIdea = catchAsync(async (req, res, next) => {
  const project = await FYP.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { projects: { _id: req.body.projectId } } },
    { safe: true, multi: true, new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
// @route         GET /api/v1/fyp/getnames
// @desc          get FYP names
// @access        Private

exports.getProjectsName = catchAsync(async (req, res, next) => {
  const names = await FYP.find({}).select(
    "-eventProvider -createdAt -__v -eventFor -projects -timeAssign"
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      names,
    },
  });
});

// @route         DELETE /api/v1/fyp
// @desc          delete FYP
// @access        Private
exports.deleteFYP = catchAsync(async (req, res, next) => {
  const project = await FYP.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

//  @route          PUT /api/v1/fyp/assign-time
//  @desc           assign presentation time
//  @access         Private
exports.assignTime = catchAsync(async (req, res, next) => {
  const projects = await FYP.findOne({ _id: req.body.eventName }).select(
    "+projects -eventProvider -eventName -batch -eventFor -__v -createdAt"
  );

  if (projects.projects.length > 0) {
    for (let i = 0; i < projects.projects.length; i++) {
      const date = new Date(`${req.body.date} ${req.body.startTime}`);

      const datePlusDuration = date.getTime() + i * (req.body.duration * 60000);
      const breakTimeStart = new Date(
        `${req.body.date} ${req.body.breakTimeStart}`
      ).getTime();
      const breakTimeEnd = new Date(
        `${req.body.date} ${req.body.breakTimeEnd}`
      ).getTime();
      if (
        datePlusDuration < breakTimeStart ||
        datePlusDuration > breakTimeEnd
      ) {
        const time = formatAMPM(new Date(datePlusDuration));

        projects.projects[i].presentationDate = req.body.date;
        projects.projects[i].presentationTime = time;
      }
    }

    const updatedProjects = await FYP.findOneAndUpdate(
      { _id: req.body.eventName },
      { projects: projects.projects, timeAssign: true },
      { new: true }
    );
    return res.end();
  }

  next(new AppError("Time already assign", 400, null));
});

//  @route          PUT /api/v1/fyp/assign-teacher
//  @desc           assign presentation time
//  @access         Private
exports.assignTeacher = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const projects = await FYP.findOneAndUpdate(
    {
      $and: [
        { _id: req.body.fypId },
        { projects: { $elemMatch: { _id: req.body.ideaId } } },
        // { "projects._id": req.params.fypId },
      ],
    },
    { $push: { "projects.$.teacher": req.body.teacher } },
    { new: true }
  );
  console.log(projects);

  // next(new AppError("Time already assign", 400, null));
});

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
