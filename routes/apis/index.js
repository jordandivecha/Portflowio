const router = require("express").Router();
const savedobjects = require("./savedobjects");
const userinfo = require("./userinfo");


router.use("/userinfo", userinfo);
router.use("/savedobjects", savedobjects);

module.exports = router;
