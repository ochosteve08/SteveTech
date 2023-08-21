const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// noteSchema.plugin(AutoIncrement, {
//   inc_field: "ticket",
//   id: "ticketNums",
//   start_seq: 500,
// });

const NoteModel = mongoose.model("Note", noteSchema);
module.exports = NoteModel;
