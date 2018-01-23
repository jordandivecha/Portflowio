var mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
  postImage: {type: String, required: true},
  title: {type: String, required: true},
  creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  link1: {type: String, required: false},
  link2: {type: String, required: false},
  likeCount: {type: Number, default: 0},
  likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
  description: {type: String, required: true} });

 var Post = mongoose.model ('Post', postSchema);

module.exports = Post;
