var mongoose = require ('mongoose');
Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/portflowio",
  {
    useMongoClient: true
  }

);

var userSchema = new Schema({
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
