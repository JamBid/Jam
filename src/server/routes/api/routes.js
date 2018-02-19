const router = require("express").Router();
const prodRoutes = require("../../controllers/productAPI");
const userRoutes = require("../../controllers/userAPI");

//Jam Bids routes
router.use("/prod", prodRoutes);
router.use("/user", userRoutes);

module.exports = router;