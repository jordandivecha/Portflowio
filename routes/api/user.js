const router = require("express").Router();
const userController = require("../../controllers/userController.js");


// default route

// router.route("/api/user/:username")
// 	.get(userController.findByUsername
//
// 		router.route("/api/user/:email")
// 			.get(userController


router.route("/")
.post(userController.create);



module.exports = router;
