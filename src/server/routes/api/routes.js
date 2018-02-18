const router = require("express").Router();
const prodRoutes = require("../../controllers/productAPI");

//Jam Bids routes
router.use("/prod", prodRoutes);

module.exports = router;