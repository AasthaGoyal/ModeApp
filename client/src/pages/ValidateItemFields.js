import validator from "validator";

class ValidateItemFields {
  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */

  validateCategory(category) {
    if (validator.isEmpty(category)) {
      return "Please select a category";
    }
    return false;
  }

  validateImages(images) {
    if (validator.isEmpty(images)) {
      return "At least one image is required";
    }
    return false;
  }

  validateName(name) {
    if (validator.isEmpty(name)) {
      return "Name is required";
    }
    return false;
  }

  validateDescription(description) {
    if (validator.isEmpty(description)) {
      return "Description is required";
    }
    return false;
  }

  validatePrice(price) {
    if (validator.isEmpty(price)) {
      return "Price is required";
    }
    return false;
  }

  validateCare(care) {
    if (validator.isEmpty(care)) {
      return "Care is required";
    }
    return false;
  }

  validateStock(stock) {
    if (validator.isEmpty(stock)) {
      return "Stock is required";
    }
    return false;
  }
}

const validateFields = new ValidateItemFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };
