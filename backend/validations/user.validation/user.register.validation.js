const Joi = require("joi");

const userRegisterValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .label("Email")
    .max(255),
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\[\]{}()_\-.]{8,}$/
    )
    .min(8)
    .max(128),
});

const createUserValidation = Joi.object({
  username: Joi.string().required().label("Username"),
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\[\]{}()_\-.]{8,}$/
    )
    .min(8)
    .max(128),
  roles: Joi.string().required().label("User roles"),
});

const getUserValidation = Joi.object({
  id: Joi.string().required().label("user id"),
});

const noteIdValidation = Joi.object({
  id: Joi.string().required().label("note Id"),
});

const updateUserValidation = Joi.object()({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  completed: Joi.boolean().label("Completed"),
});

module.exports = {
  createUserValidation,
  getUserValidation,
  noteIdValidation,
  updateUserValidation,
  userRegisterValidation,
};
