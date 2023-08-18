const Joi = require("joi");

const createNoteValidation = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  userId: Joi.string().required().label("User ID"),
});

const getTodoValidation = Joi.object({
  id: Joi.string().required().label("Todo Id"),
});

const todoIdValidation = Joi.object({
  id: Joi.string().required().label("Todo Id"),
});

const updateNoteValidation = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  completed: Joi.boolean().label("Completed"),
  userId: Joi.string().required().label("User ID"),
  id: Joi.string().required().label("note ID"),
});

module.exports = {
  createNoteValidation,
  getTodoValidation,
  todoIdValidation,
  updateNoteValidation,
};
