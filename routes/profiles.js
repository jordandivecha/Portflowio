const router = require("express").Router();
const userController = require("../controllers/userController.js");


router.route("/:email")
.get(userController.findByEmail);

router.route("/:userid")
.post(userController.follow)
.delete(userController.unfollow);

module.exports = router;
