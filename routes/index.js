const path = require("path");


const apiRoutes = require("./api");
// models = require('./models'),
// passport = require('passport'),
// _ = require('underscore'),
async = require('async'),
stream_node = require('getstream-node'),
// fs = require('fs'),
// bodyParser = require('body-parser'),
// methodOverride = require('method-override');

router = require("express").Router();
// User = models.User,
// Post = models.Post,
// Like = models.Like,
// Follow = models.Follow;
//
// var FeedManager = stream_node.FeedManager;
// var StreamMongoose = stream_node.mongoose;
// var StreamBackend = new StreamMongoose.Backend();
// var enrichActivities = function(body) {
// 	var activities = body.results;
// 	return StreamBackend.enrichActivities(activities);
// };
// var enrichAggregatedActivities = function(body) {
// 	var activities = body.results;
// 	return StreamBackend.enrichAggregatedActivities(activities);
// };
router.use("/api", apiRoutes);


router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
