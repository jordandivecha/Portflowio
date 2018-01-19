const path = require("path");
const router = require("express").Router();
const apisRoutes = require("./apis");
//the opener
router.use("/apis", apisRoutes);


router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
