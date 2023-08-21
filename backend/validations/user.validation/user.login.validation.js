const Joi = require("joi");

const userLoginValidation = Joi.object({
  username: Joi.string().required().label("Username"),
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\[\]{}()_\-.]{8,}$/
    )
    .min(8)
    .max(128),
});

module.exports = {
  userLoginValidation,
};
