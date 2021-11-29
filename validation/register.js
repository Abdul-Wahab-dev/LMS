const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.role = !isEmpty(data.role) ? data.role : "";
  data.enrollmentNo = !isEmpty(data.enrollmentNo) ? data.enrollmentNo : "";
  data.fatherName = !isEmpty(data.fatherName) ? data.fatherName : "";
  data.program = !isEmpty(data.program) ? data.program : "";
  data.degreeDuration = !isEmpty(data.degreeDuration)
    ? data.degreeDuration
    : "";
  data.batch = !isEmpty(data.batch) ? data.batch : "";
  data.maxSemester = !isEmpty(data.maxSemester) ? data.maxSemester : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";
  data.personalEmail = !isEmpty(data.personalEmail) ? data.personalEmail : "";
  data.permanentAddress = !isEmpty(data.permanentAddress)
    ? data.permanentAddress
    : "";
  data.currentAddress = !isEmpty(data.currentAddress)
    ? data.currentAddress
    : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "role field is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.fatherName)) {
    errors.fatherName = "fatherName field is required";
  }
  if (Validator.isEmpty(data.enrollmentNo)) {
    errors.enrollmentNo = "enrollmentNo field is required";
  }
  if (Validator.isEmpty(data.program) && data.role === "student") {
    errors.program = "program field is required";
  }
  if (Validator.isEmpty(data.degreeDuration) && data.role === "student") {
    errors.degreeDuration = "degree duration field is required";
  }
  if (Validator.isEmpty(data.batch) && data.role === "student") {
    errors.batch = "batch field is required";
  }
  if (Validator.isEmpty(data.maxSemester) && data.role === "student") {
    errors.maxSemester = "max semester field is required";
  }
  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "mobile number field is required";
  }
  if (Validator.isEmpty(data.contact)) {
    errors.contact = "contact number field is required";
  }
  if (Validator.isEmpty(data.personalEmail)) {
    errors.personalEmail = "personal Email field is required";
  }
  if (Validator.isEmpty(data.permanentAddress)) {
    errors.permanentAddress = "permanent address field is required";
  }
  if (Validator.isEmpty(data.currentAddress)) {
    errors.currentAddress = "current address field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
