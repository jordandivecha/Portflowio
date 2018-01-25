const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
module.exports = {

	create: function(req, res) {
    // const user = {
    //   _id: req.body._id,
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   username: req.body.username,
    //   userImage: req.body.userImage,
    //   password: req.body.password,
    //   birthday: req.body.birthday,
    //   github: req.body.github,
    //   linkedin: req.body.linkedin,
    //   website: req.body.website,
    //   email: req.body.email,
    //   saved: [{}],
    //   posts: [{}]
    // };
		// console.log(req.body);
    db.User.collection
      .insertOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).send('Oh No!'));
		},
	// },
  //
	// remove: function(req, res) {
  //   //again, might be userSchema
  //   db.User
  //   .findById({ _id: req.params.id })
  //   .then(user => user.remove())
  //   .then(user => res.json(user))
  //   .catch(err => res.status(422).json(err));
	// },
  //
  update: function(req, res) {

    db.User.findOneAndUpdate({ '_id': ObjectId(req.params.userid)}, {$set: req.body}, { new: true }).then(user =>res.json(user)
	).catch(err => res.status(422).json(err));

  },
  //
  // findAll: function(req, res) {
  //   db.User
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(user => res.json(user))
  //     .catch(err => res.status(422).json(err));
  // },
  //
  findByEmail: function(req, res) {

    db.User
      .findOne(
				{'email': req.params.email}
			)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

	findById: function(req,res){

		db.User
		.findOne(
			{ '_id': ObjectId(req.params.userid)})
			.then(user => res.json(user))
			.catch(err=> res.status(422).json(err));

}

};
