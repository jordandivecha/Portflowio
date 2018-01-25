const router = require("express").Router();
const userController = require("../../controllers/userController.js");


// default route

// router.route("/api/user/:username")
// 	.get(userController.findByUsername
//
// 		router.route("/api/user/:email")
// 			.get(userController
console.log('gitdatuserroute');
router.route("/:email")
.get(userController.findByEmail)
.post(userController.);


router.route("/")
.post(userController.create);



module.exports = router;
