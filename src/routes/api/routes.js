const router = require("express").Router();
const prodRoutes = require("../../controllers/productAPI");

// Book routes
router.use("/prod", prodRoutes);

module.exports = router;