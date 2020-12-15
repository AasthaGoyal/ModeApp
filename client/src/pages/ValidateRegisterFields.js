import validator from "validator";

class ValidateLoginFields {
  validateName(value) {
    if (validator.isEmpty(value)) {
      return "Name is required";
    }
    return false;
  }

  validateEmail(value) {
    if (validator.isEmpty(value)) {
      return "Email is required";
    } else if (!validator.isEmail(value)) {
      return "Invalid Email";
    }
    return false;
  }

  validateCpassword(value) {
    if (validator.isEmpty(value)) {
      return "Password is required";
    }
    return false;
  }

  validatePassword(value) {
    if (validator.isEmpty(value)) {
      return "Confirm Password is required";
    }
    return false;
  }
}

const validateFields = new ValidateLoginFields();

export { validateFields };
