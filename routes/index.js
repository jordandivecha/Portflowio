const path = require("path");


const apiRoutes = require("./api");
const profileRoutes= require("./profiles.js")


router = require("express").Router();

router.use("/user", profileRoutes)
router.use("/api", apiRoutes);


router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
