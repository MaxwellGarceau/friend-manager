class CustomValidation {
  containsNumber (str) {
    return /\d/.test(str);
  }
  containsSpecialChar (str) {
    return /[!@#$%^&*(),.?"[\]\\:{}`~|<>/;'=+\-_]/.test(str);
  }
}

module.exports = {
  CustomValidation
};
