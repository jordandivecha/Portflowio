const router = require("express").Router();
const savedCardsRoutes = require("./savedCards.js");
const userRoutes = require ("./user.js")


router.use("/savedCards", savedCardsRoutes);
router.use ("/user", userRoutes);

module.exports = router;
