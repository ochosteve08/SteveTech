const {
  createUserValidation,
  getUserValidation,
  noteIdValidation,
  updateUserValidation,
 
} = require("./user.register.validation");
const { userLoginValidation } = require("./user.login.validation");

module.exports = {
  createUserValidation,
  getUserValidation,
  noteIdValidation,
  updateUserValidation,
  userLoginValidation,
};
