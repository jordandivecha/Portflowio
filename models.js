
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var stream = require('getstream-node');

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/portflowio",
  {
    useMongoClient: true
  }

);

var FeedManager = stream.FeedManager;
var StreamMongoose = stream.mongoose;

var userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
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
    saved: [{}],
    posts: [{}],
    date: { type: Date, default: Date.now }

  },
	{
		collection: 'User',
	}
);
const User = mongoose.model("User", userSchema);



var postSchema = new Schema({
  postImage: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  link1: {type: String, required: false},
  link2: {type: String, required: false},
  likeCount: {type: Number, default: 0},
  description: {type: String, required: true} },
  {collection: 'Post'}
);
 var Post = mongoose.model ('Post', postSchema);

 var likeSchema = new Schema(
 	{
 		user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
 		post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' }
 	},
 	{
 		collection: 'Like'
 	}
 );

likeSchema.plugin(StreamMongoose.activity);
likeSchema.statics.pathsToPopulate = function() {
	return ['user', 'post'];
};

likeSchema.methods.activityForeignId = function() {
	return this.user._id + ':' + this.post._id;
};

var Like = mongoose.model('Like', likeSchema);




// postSchema.methods.activityActorProp = function() {
//   return 'user';
// }
//
// postSchema.methods.createActivity = function() {
//
//       var activity = {};
//       var extra_data = this.activityExtraData();
//       for (var key in extra_data) {
//           activity[key] = extra_data[key];
//       }
//       activity.to = (this.activityNotify() || []).map(function(x){return x.id});
//       activity.actor = this.activityActor();
//       activity.verb = this.activityVerb();
//       activity.object = this.activityObject();
//       activity.foreign_id = this.activityForeignId();
//       if (this.activityTime()) {
//           activity.time = this.activityTime();
//       }
//       return activity;
//   }
//
// postSchema.methods.activityNotify = function() {
//   if (this.isRetweet) {
// 	  target_feed = FeedManager.getNotificationFeed(this.parent.author.id);
// 	  return [target_feed];
//   }
// };

var followSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		target: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	},
	{
		collection: 'Follow',
	}
);

followSchema.plugin(StreamMongoose.activity);

followSchema.methods.activityNotify = function() {
	target_feed = FeedManager.getNotificationFeed(this.target._id);
	return [target_feed];
};

followSchema.methods.activityForeignId = function() {
	return this.user._id + ':' + this.target._id;
};

followSchema.statics.pathsToPopulate = function() {
	return ['user', 'target'];
};

followSchema.post('save', function(doc) {
	if (doc.wasNew) {
		var userId = doc.user._id || doc.user;
		var targetId = doc.target._id || doc.target;
		FeedManager.followUser(userId, targetId);
	}
});

followSchema.post('remove', function(doc) {
	FeedManager.unfollowUser(doc.user, doc.target);
});

var Follow = mongoose.model('Follow', followSchema);

// send the mongoose instance with registered models to StreamMongoose
StreamMongoose.setupMongoose(mongoose);

module.exports = {
	User: User,
	Post: Post,
	Like: Like,
	Follow: Follow,
};
