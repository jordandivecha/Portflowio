var mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  postImage: {type: String, required: true},
  title: {type: String, required: true},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  website: {type: String, required: false},
  project: {type: String, required: false},
  tags: [{type: String, required: false}],
  likeCount: {type: Number, default: 0},
  likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
  description: {type: String, required: true}},{ _id: false } );

 var Post = mongoose.model ('Post', postSchema);

module.exports = Post;
