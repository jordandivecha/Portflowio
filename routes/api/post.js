const router = require("express").Router();
const postController = require("../../controllers/postController");



router.route("/")
	.get(postController.findAll)
	.post(postController.create);

router.route("/:userid")
.get(postController.findById);
// router.route("/:user")
// 	.get(cardController.findById)
// 	.put(cardController.update)
// 	.delete(cardController.remove)
//
// router.route("/user/id")
// .post (userController.create);
//
// router.route("/user/saved/id")


module.exports = router;
