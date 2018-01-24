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
    bio: {type: String, required: false},
    followers: [{type: ObjectId, ref: 'User'}],
    following: [{type: ObjectId, ref: 'User'}],
    likes: [{type: ObjectId, ref:'Post'}],
    posts: [{type: ObjectId, ref: 'Post'}],
    date: { type: Date, default: Date.now }

  });
const User = mongoose.model("User", userSchema);

module.exports = User;
