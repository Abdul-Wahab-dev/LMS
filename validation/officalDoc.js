const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInput(data) {
  let errors = {};

  data.documentFor = !isEmpty(data.documentFor) ? data.documentFor : "";
  data.body = !isEmpty(data.body) ? data.body : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (Validator.isEmpty(data.documentFor)) {
    errors.documentFor = "Document For is required";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
