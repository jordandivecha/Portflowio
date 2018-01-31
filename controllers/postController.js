const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
// Methods for postController

module.exports = {

	findAll: function(req, res) {
		db.Post
    		.find(req.query)
    		.then(dbModel => res.json(dbModel))
    		.catch(err => res.status(422).json(err));
  	},

	findById: function(req, res) {
		var stringy = (req.params.userid).toString()
		db.Post
				.find(
					{creator: ObjectId(stringy)})
					.then(post => res.json(post))
					.catch(err=> res.status(422).json(err));
	},

	create: function(req, res) {

    	db.Post
    		.create({
					title: req.body.title,
					creator: ObjectId(req.body.creator),
					description: req.body.description,
					tags: req.body.tags,
					website: req.body.website,
					project: req.body.project,
					postImage: req.body.postImage
				})
    		.then(dbModel => res.json(dbModel))
    		.catch(err => res.status(422).json(err));
	},

	remove: function(req, res) {
   		db.Post
    		.findById({ _id: req.params.id })
    		.then(dbModel => dbModel.remove())
    		.then(dbModel => res.json(dbModel))
    		.catch(err => res.status(422).json(err));
	},

	update: function(req, res) {
    	db.Post
    		.findOneAndUpdate({ _id: req.params.id }, req.body)
    		.then(dbModel => res.json(dbModel))
    		.catch(err => res.status(422).json(err));
  },
};
