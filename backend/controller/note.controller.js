const UserModel = require("../models/user.models");
const NoteModel = require("../models/note.models");
const asyncHandler = require("express-async-handler");
const { noteValidation } = require("../validations");

//@access Private

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await NoteModel.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await UserModel.findById(note.userId).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});

//@access Private
const createNote = asyncHandler(async (req, res) => {
  const { userId, title, description } =
    await noteValidation.createNoteValidation.validateAsync(req.body);
  //check for duplicate title
  const duplicate = await NoteModel.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }
  //create and store note
  const note = await NoteModel.create({ userId, title, description });
  console.log("saved note:", note);
  if (note) {
    res.status(200).json({ message: "New note created successfully", note });
  } else {
    res.status(400).json({ message: "invalid note data received" });
  }
});

//@access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, userId, title, description, completed } =
    await noteValidation.updateNoteValidation.validateAsync(req.body);

  // Confirm note exists to update
  const note = await NoteModel.findById(id).exec();

  if (!note) {
    res.status(400).json({ message: "note not found" });
  }

  // check for duplicate
  const duplicate = await NoteModel.findOne({ title }).lean().exec();

  //allow update to original user
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate title" });
  }
  note.userId = userId;
  note.title = title;
  note.description = description;
  note.completed = completed;

  const updateNote = await note.save();
  res.json({ message: `${updateNote.title} updated`, updateNote });
});

//@access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = await noteValidation.getNoteValidation.validateAsync(req.body);

  // Confirm note exists to delete
  const note = await NoteModel.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "note not found" });
  }

  const result = await note.deleteOne();
  const reply = `Note '${result.title}' with ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
