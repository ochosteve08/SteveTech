const Joi = require("joi");

const userLoginValidation = Joi.object({
  username: Joi.string().required().label("Username").messages({
    "string.min": '"username" should have a minimum length of 6',
  }),
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\[\]{}()_\-.]{8,}$/
    )
    .min(8)
    .max(128)
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase, lowercase, number and special character",
    }),
});

module.exports = {
  userLoginValidation,
};
