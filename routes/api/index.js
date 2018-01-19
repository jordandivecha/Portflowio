const router = require("express").Router();
const savedCardsRoutes = require("./savedCards.js");



router.use("/savedCards", savedCardsRoutes);


module.exports = router;
