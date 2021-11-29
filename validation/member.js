const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function member(data) {
  let errors = {};

  data.id = !isEmpty(data.id) ? data.id : "";
  data.member.designation = !isEmpty(data.member.designation)
    ? data.member.designation
    : "";
  if (Validator.isEmpty(data.id)) {
    errors.id = "Team Name field is required";
  }

  if (Validator.isEmpty(data.member.designation)) {
    errors.designation = "Designation field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
