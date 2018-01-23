var mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: false },
    userImage: { type: String, required: false },
    password: {type: String, required: false },
    birthday: {type: Date, required: false},
    github: {type: String, required: false},
    linkedin: {type: String, required:false},
    website: {type: String, required: false},
    email: {type: String, required: true},
    followers: [{Schema.Types.ObjectId, ref: 'User'}],
    following: [{Schema.Types.ObjectId, ref: 'User'}],
    likes: [{Schema.Types.ObjectId, ref:'Post'}],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    date: { type: Date, default: Date.now }

  });
const User = mongoose.model("User", userSchema);

module.exports = User;
