const router = require("express").Router();
const userController = require("../../controllers/userController.js");


// default route


router.route("/:email")
.get(userController.findByEmail);

router.route("/:userid")
.get(userController.findById)
.post(userController.update);


router.route("/")
.post(userController.create);

router.route("/like/:postid")
.post(userController.like)
.delete(userController.unlike);


module.exports = router;
