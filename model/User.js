const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// const bcrpt = require('bcryptjs')
const userSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  enrollmentNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  program: {
    type: String,
  },
  degreeDuration: {
    type: String,
  },
  batch: {
    type: String,
  },
  maxSemester: {
    type: String,
  },
  mobile: {
    type: String,
  },
  contact: {
    type: String,
  },
  personalEmail: {
    type: String,
  },
  universityEmail: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  currentAddress: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },

  passwordConfirm: {
    type: String,
    required: true,
  },
  approvedUser: {
    type: Boolean,
    required: true,
    default: false,
  },
  permissions: {
    CSP: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: false,
      },
    },
    PEC: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: false,
      },
    },
    NEWS: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: false,
      },
    },
    INTERNSHIP: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: false,
      },
    },
    FYP: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: false,
      },
    },
    TEAM: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: false,
      },
    },
  },
  passwordChangedAt: Date,
  profile: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

module.exports = User = mongoose.model("users", userSchema);
