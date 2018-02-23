const router = require("express").Router();
const prodRoutes = require("../../controllers/productAPI");
const userRoutes = require("../../controllers/userAPI");
const questionRoutes = require("../../controllers/questionAPI");
const answerRoutes = require("../../controllers/answerAPI");

//Jam Bids routes
router.use("/prod", prodRoutes);
router.use("/user", userRoutes);
router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);

module.exports = router;