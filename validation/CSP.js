const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function CSP(data) {
  let errors = {};

  data.batch = !isEmpty(data.batch) ? data.batch : "";
  data.program = !isEmpty(data.program) ? data.program : "";
  data.enrollmentNo = !isEmpty(data.enrollmentNo) ? data.enrollmentNo : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.deadLineDate = !isEmpty(data.deadLineDate) ? data.deadLineDate : "";

  if (Validator.isEmpty(data.batch)) {
    errors.batch = "Batch field is required";
  }
  if (Validator.isEmpty(data.program)) {
    errors.program = "Program field is required";
  }
  if (Validator.isEmpty(data.enrollmentNo)) {
    errors.enrollmentNo = "enrollment No field is required";
  }

  if (Validator.isEmpty(data.deadLineDate)) {
    errors.deadLineDate = "Deadline date field is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
