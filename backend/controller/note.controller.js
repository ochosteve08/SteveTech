const UserModel = require("../models/user.models");
const NoteModel = require("../models/note.models");
const asyncHandler = require("express-async-handler");

//@access Private

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await NoteModel.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
 
  // Add username to each note before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await UserModel.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});


//@access Private
const createNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  if (!user || !title || !text) {
    return res.status(400).json({ message: " All fields are required" });
  }

  // check for duplicate title
  const duplicate = await UserModel.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }
 
  //create and store note
  const note = await NoteModel.create({ user, title, text });
  if (note) {
    res.status(200).json({ message: "New note created successfully", user });
  } else {
    res.status(400).json({ message: "invalid note data received" });
  }
});

//@desc update a user
//@route PATCH /user
//@access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  //confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Confirm note exists to update
  const note = await NoteModel.findById(id).exec();

  if (!note) {
    res.status(400).json({ message: "note not found" });
  }

  //check for duplicate
  const duplicate = await UserModel.findOne({ title }).lean().exec();

  //allow update to original user
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate title" });
  }
  note.user = user;
  user.title = title;
  user.text = text;
  note.completed = completed;

   const updateNote = await note.save();
  res.json({ message: `${updateNote.title} updated`, updateNote});
});

//@desc delete user
//@route DELETE /user
//@access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "note id required" });
  }
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
