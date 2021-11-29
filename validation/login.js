const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.enrollmentNo = !isEmpty(data.enrollmentNo) ? data.enrollmentNo : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (Validator.isEmpty(data.enrollmentNo)) {
    errors.enrollmentNo = "enrollmentNo field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
