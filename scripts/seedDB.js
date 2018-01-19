const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/portflowio",
  {
    useMongoClient: true
  }
);


const seed = [{
  firstName: "Rocky",
  lastName: "Divecha",
  username: "pppawz",
  userImage: "https://scontent-lax3-2.cdninstagram.com/vp/19889f14ebbe7c6801797ebca1ad6085/5ADF4A5D/t51.2885-15/e35/26066030_1582594718453955_6944867538157174784_n.jpg",
  password: "pppawz",
  birthday: 04/28/2015,
  github: null,
  linkedin: null,
  website: null,
  email: "doingla@gmail.com",
  saved: [{}],
  posts: [{}]
   }];

db.User.remove({})
.then(()=> db.User.collection.insertMany(seed))
.then(data => {
  console.log(data.insertedIds.length + " records inserted.");
  process.exit(0);
})
.catch(err =>{
  console.error(err);
  process.exit(1);
});
