
import validator from "validator";

class ValidateLoginFields  {


  validateEmail(value) {
    if (validator.isEmpty(value)) {
      return "Email is required";
    } else if (!validator.isEmail(value)) {
      return "Invalid Email";
    }
    return false;
  }

  validatePassword(value) {
    if (validator.isEmpty(value)) {
      return "Password is required";
    }
    return false;
  }
}

const validateFields = new ValidateLoginFields();

export {validateFields} ;
