
import validator from "validator";

class ValidateFields  {
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

  validateMessage(value) {
    if (validator.isEmpty(value)) {
      return "Message is required";
    }
    return false;
  }
}

const validateFields = new ValidateFields();

export {validateFields} ;
