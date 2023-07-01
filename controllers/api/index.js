const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoutes')

// NEED TO REQUIRE MODELS

//NEED ROUTER.USE FOR MODELS

router.use('/dashboard', dashboardRoutes)


module.exports = router;