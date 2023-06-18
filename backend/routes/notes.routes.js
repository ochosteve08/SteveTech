const express = require("express");
const router = express.Router();
const notesController = require("../controller/note.controller");

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

module.exports = router;
