const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required:true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: "Employee",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model('grayUser',userSchema);
module.exports = UserModel;