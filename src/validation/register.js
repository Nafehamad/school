import Validator from 'validator';


function validateRegisterForm(data) {
  let errors = {
    email : '',
    password : ''
  };

 if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 character long';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }


  if (Validator.isEmpty(data.role)) {
    errors.role = 'Role field is required';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'phone field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be at least 6 characters long';
  }

  return {
    errors,
    isValid: errors.email == '' && errors.password =='' 
  };
};

export default validateRegisterForm;