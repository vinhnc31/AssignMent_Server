const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const newUser = mongoose.model("users", UserSchema);
module.exports = newUser;
