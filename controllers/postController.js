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
		db.Post
				.findOne(
					{ 'creator': ObjectId(req.params.userid)})
					.then(user => res.json(user))
					.catch(err=> res.status(422).json(err));
	},

	create: function(req, res) {
		console.log(req.body);
    	db.Post
    		.create(req.body)
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
