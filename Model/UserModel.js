const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModel = new Schema(
  {
    name: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserModel);
