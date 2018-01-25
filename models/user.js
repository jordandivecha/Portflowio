var mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: false },
    userImage: { type: String, required: false },
    password: {type: String, required: false },
    github: {type: String, required: false},
    linkedin: {type: String, required:false},
    website: {type: String, required: false},
    email: {type: String, required: true, index: {unique: true}},
    bio: {type: String, required: false},
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
    likes: [{type: Schema.Types.ObjectId, ref:'Post'}],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    date: { type: Date, default: Date.now }

  }, { _id: false });
const User = mongoose.model("User", userSchema);

module.exports = User;
