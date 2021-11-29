const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function teamAssignment(data) {
  let errors = {};
  data.id = !isEmpty(data.id) ? data.id : "";
  data.assignment.batch = !isEmpty(data.assignment.batch)
    ? data.assignment.batch
    : "";
  data.assignment.title = !isEmpty(data.assignment.title)
    ? data.assignment.title
    : "";
  data.assignment.program = !isEmpty(data.assignment.program)
    ? data.assignment.program
    : "";
  data.assignment.enrollmentNo = !isEmpty(data.assignment.enrollmentNo)
    ? data.assignment.enrollmentNo
    : "";
  data.assignment.name = !isEmpty(data.assignment.name)
    ? data.assignment.name
    : "";

  if (Validator.isEmpty(data.id)) {
    errors.id = "Team Name field is required";
  }
  if (Validator.isEmpty(data.assignment.batch)) {
    errors.batch = "Batch field is required";
  }
  if (Validator.isEmpty(data.assignment.program)) {
    errors.program = "Program field is required";
  }
  if (Validator.isEmpty(data.assignment.enrollmentNo)) {
    errors.enrollmentNo = "enrollment No field is required";
  }
  if (Validator.isEmpty(data.assignment.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.assignment.title)) {
    errors.title = "Name field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
