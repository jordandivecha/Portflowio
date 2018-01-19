const router = require("express").Router();
const Controller = require("../../controller/maincontroller");


router.route("/")
  .get(User.findAll)
  .post(User.update)
  .delete(User.remove);

module.exports = router;
