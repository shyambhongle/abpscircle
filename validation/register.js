const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.firstName) ? data.firstName : '';
  data.name = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';





  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'firstName must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'firstName field is required';
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'lastName must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'lastName field is required';
  }




  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }


  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
