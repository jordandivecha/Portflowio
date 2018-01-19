const db = require("../models");

// Methods for cardController

module.exports = {

	findAll: function(req, res) {
		db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
	},

	findById: function(req, res) {

	},

	create: function(req, res) {

	},

	remove: function(req, res) {

	}
};
