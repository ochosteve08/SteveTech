const Joi = require("joi");

const createUserValidation = Joi.object({
  username: Joi.string().required().label("Username"),
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\[\]{}()_\-.]{8,}$/
    )
    .min(8)
    .max(128),
  roles: Joi.array().items(Joi.string()).default(["Employee"]).label("Roles"),
  active: Joi.boolean().default(true).label("Active"),
});

const getUserValidation = Joi.object({
  id: Joi.string().required().label("user id"),
  username: Joi.string().label("Username"),
  roles: Joi.array().items(Joi.string()).min(1).label("Roles"),
  active: Joi.boolean().label("Active"),
});

const noteIdValidation = Joi.object({
  id: Joi.string().required().label("note Id"),
});

const updateUserValidation = Joi.object({
  id: Joi.string().required().label("_id"),
  username: Joi.string().required().label("Username"),
  password: Joi.string().allow("").optional().label("Password"),
  roles: Joi.array().items(Joi.string()).min(1).required().label("Roles"),
  active: Joi.boolean().required().label("Active"),
});

module.exports = {
  createUserValidation,
  getUserValidation,
  noteIdValidation,
  updateUserValidation,
 
};
