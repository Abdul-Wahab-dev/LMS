const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.complainFor = !isEmpty(data.complainFor) ? data.complainFor : "";
  data.body = !isEmpty(data.body) ? data.body : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (Validator.isEmpty(data.complainFor)) {
    errors.complainFor = "complain For field is required";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "body field is required";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
