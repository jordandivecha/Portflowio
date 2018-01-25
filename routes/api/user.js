const router = require("express").Router();
const userController = require("../../controllers/userController.js");


// default route

// router.route("/api/user/:username")
// 	.get(userController.findByUsername
//
// 		router.route("/api/user/:email")
// 			.get(userController

router.route("/:email")
.get(userController.findByEmail);

router.route("/:userid")
.get(userController.findById)
.post(userController.update);


router.route("/")
.post(userController.create);



module.exports = router;
