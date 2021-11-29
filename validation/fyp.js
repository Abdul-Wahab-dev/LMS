const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function fyp(data) {
  let errors = {};

  data.eventName = !isEmpty(data.eventName) ? data.eventName : "";
  data.batch = !isEmpty(data.batch) ? data.batch : "";

  if (Validator.isEmpty(data.eventName)) {
    errors.eventName = "Event Name field is required";
  }
  if (Validator.isEmpty(data.batch)) {
    errors.batch = "Batch field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
