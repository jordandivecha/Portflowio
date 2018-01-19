const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  userImage: { type: String, required: true },
  password: {type: String, required: true },
  birthday: {type: Date, required: true},
  github: {type: String, required: false},
  linkedin: {type: String, required:false},
  website: {type: String, required: false},
  email: {type: String, required: true},
  saved: [{}],
  posts: [{}],
  date: { type: Date, default: Date.now }

}, { _id: false });

const Article = mongoose.model("User", userSchema);

module.exports = User;
