const Joi = require("joi");

const createNoteValidation = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  userId: Joi.string().required().label("User ID"),
});

const getNoteValidation = Joi.object({
  id: Joi.string().required().label("Note Id"),
  title: Joi.string().label("Title"),
  description: Joi.string().label("Description"),
  userId: Joi.string().label("User ID"),
  completed: Joi.boolean().label("Completed"),
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
  getNoteValidation,
  updateNoteValidation,
};
