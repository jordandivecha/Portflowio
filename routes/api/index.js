const router = require("express").Router();
const postRoutes = require("./post.js");
const profileRoutes = require ("./user.js");


router.use("/post", postRoutes);
router.use ("/profile", profileRoutes);

module.exports = router;
