const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTeamInput(data) {
  let errors = {};

  data.teamName = !isEmpty(data.teamName) ? data.teamName : "";
  data.semesterType = !isEmpty(data.semesterType) ? data.semesterType : "";

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (Validator.isEmpty(data.teamName)) {
    errors.teamName = "Team Name field is required";
  }

  if (Validator.isEmpty(data.semesterType)) {
    errors.semesterType = "Type field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
