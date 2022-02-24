const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const keys = require("../config/keys");
const registerValidate = require("../validation/register");
const loginValidate = require("../validation/login");

const { promisify } = require("util");
// const APIFeatures = require("../utils/")

const signToken = (payload) => {
  return jwt.sign(payload, keys.JWT_SECRET, {
    expiresIn: 7200,
  });
};

// @route       POST /api/v1/users/create-multiple-users
// @desc        Create new Users
// @access      Private
exports.createMultipleUsers = catchAsync(async (req, res, next) => {
  const users = User.create(req.body.users);

  if (!users) {
    return next(new AppError("Errors"));
  }

  res.status(201).json({
    status: "success",
    data: {
      users,
    },
  });
});
// @route       POST /api/v1/users/signup
// @desc        Create new User
// @access      Public
exports.signup = catchAsync(async (req, res, next) => {
  // Get Data
  const data = JSON.parse(req.body.user);
  const { errors, isValid } = registerValidate(data);
  // Check Validation
  if (!isValid) {
    return next(new AppError(`Fields Required`, 400, errors));
  }

  // check already exist or not
  const user = await User.findOne({ enrollmentNo: data.enrollmentNo });
  if (user) {
    return next(new AppError("User already exist", 409));
  }

  if (data.password !== data.passwordConfirm) {
    return next(
      new AppError("Password and Confirm Password must be same", 400)
    );
  }
  // save Filename if exist
  data.profile = req.file ? req.file.key : "";
  // create assignment

  const newUser = await User.create(data);
  res.status(201).json({
    status: "success",
    message: "User successfully created!",
    data: {
      user: newUser,
    },
  });
});

// @route       POST /api/v1/users/login
// @desc        user Login
// @access      Public
exports.login = catchAsync(async (req, res, next) => {
  const { enrollmentNo, password } = req.body;

  const { errors, isValid } = loginValidate(req.body);
  // Check Validation
  if (!isValid) {
    return next(new AppError(`Fields Required`, 400, errors));
  }
  // 1) Check if email and password exist
  if (!enrollmentNo || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ enrollmentNo }).select(
    "+password +role +approvedUser"
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  if (user.approvedUser !== true) {
    return next(new AppError("User not Approved", 401));
  }
  // 3) If everything ok, send token to client
  const payload = {
    id: user._id,
    name: user.name,
    role: user.role,
    enrollmentNo: user.enrollmentNo,
    permissions: user.permissions,
    program: user.program,
    batch: user.batch,
    profile: user.profile,
  };
  const token = await signToken(payload);

  res.status(200).json({
    status: "success",
    token: "Bearer " + token,
  });
});

exports.currentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, keys.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id).select(
    "-password  -createdAt -permanentAddress -currentAddress -personalEmail -universityEmail -contact -mobile -maxSemester -degreeDuration +batch"
  );
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// @route       GET /api/v1/users
// @desc        get users
// @access      Private
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select(
    "-__v  -permission -password  -createdAt"
  );
  // send response to user
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// @route       GET /api/v1/users/findUser
// @desc        get user
// @access      Private
exports.getUser = catchAsync(async (req, res, next) => {
  if (req.body.type === "single") {
    const user = await User.find({
      enrollmentNo: req.body.enrollment,
    }).select("-password -createdAt");
    if (!user) {
      return next(new AppError("No User found with that ID", 404));
    }

    // send response to user
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } else {
    const users = await User.find({
      $or: [
        {
          $and: [
            { enrollmentNo: req.body.enrollment },
            { role: req.body.role },
          ],
        },
        {
          $and: [
            { program: req.body.program },
            { batch: req.body.batch },
            { role: req.body.role },
          ],
        },
        {
          $and: [
            { designation: req.body.designation },
            { role: req.body.role },
          ],
        },
        {
          $and: [
            { yearofJoining: req.body.yearofJoining },
            { role: req.body.role },
          ],
        },
      ],
    }).select("-password -createdAt");
    if (!users) {
      return next(new AppError("No User found with that ID", 404));
    }

    // send response to user
    res.status(200).json({
      status: "success",
      data: {
        user: users,
      },
    });
  }
});

// @route       POST /api/v1/users/approve
// @desc        approve user
// @access      Private
exports.approveUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  }).select(
    "-__v -intakeSemester -degreeDuration -maxSemester -mobile -contact -personalEmail -permanentAddress -currentAddress -password  -createdAt"
  );

  if (!user) {
    return next(new AppError("User not exist", 404));
  }
  // send response to user
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
// @route       PATCH /api/v1/users/updatePassword
// @desc        update password
// @access      Private
exports.updatePassword = catchAsync(async (req, res, next) => {
  // find user
  const user = await User.findById(req.user._id).select("+password");
  // compare password
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }

  // change password
  user.password = req.body.passwordConfirm;
  user.passwordConfirm = req.body.passwordConfirm;
  // save user
  await user.save();

  // send response to user
  res.status(201).json({
    status: "success",
  });
});

// @route       GET /api/v1/users/getprograms
// @desc        get program and batch
// @access      Private

exports.getProgramAndBatch = catchAsync(async (req, res, next) => {
  const programs = await User.find({}).select(
    "-__v -role -enrollmentNo -name -fatherName -approvedUser -universityEmail -intakeSemester -degreeDuration -maxSemester -mobile -contact -personalEmail -permanentAddress -currentAddress -password  -createdAt"
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      programs,
    },
  });
});

// @route       GET /api/v1/users/permission
// @desc        assign permissions
// @access      Private
exports.assignPermission = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body.id },
    { permissions: req.body.permissions },
    { new: true }
  );
  // send response to user
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @route       DELETE /api/v1/users/:id
// @desc        delete users
// @access      Private
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @route       GET /api/v1/users/:role
// @desc        get all users
// @access      Private
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: req.params.role });

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

// @route       PATCH /api/v1/users/changerole
// @desc        Change User role
// @access      Private
exports.changeUserRole = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body.id },
    { role: req.body.role },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
