import Validator from 'validator';


function validateLoginForm(data) {
  let errors = {
    email: '',
    password: ''
  };

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }



  return {
    errors,
    isValid: errors.email == '' && errors.password == ''
  };
};

export default validateLoginForm